from unittest import TestCase

from app import app
from models import db, User

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///test_blogly_db'
app.config['SQLALCHEMY_ECHO'] = False

app.config['TESTING'] = True

app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()

class UserViewFunctionTestCase(TestCase):
    """Tests View Functions"""

    def setUp(self):
        """Clean up existing users"""
        User.query.delete()
        test_user = User(id=1, first_name='Harry', last_name='Potter', image_url='https://cdn.vox-cdn.com/thumbor/7n7Oe4myr7B7nYI-mxuuO3b-QrY=/150x0:1770x1215/1200x800/filters:focal(150x0:1770x1215)/cdn.vox-cdn.com/uploads/chorus_image/image/35330556/3176173-1748009911-hp.jp_.0.jpg')
        db.session.add(test_user)
        db.session.commit()

        self.test_user_id = test_user.id

    def tearDown(self):
        """Clean up any fouled transaction"""
        db.session.rollback()
        User.query.delete()

    def test_redirect_to_users_page(self):
        with app.test_client() as client:
            res = client.get('/') 

            self.assertEqual(res.status_code, 302) #reroute
            self.assertEqual(res.location, 'http://localhost/users')

    def test_users_page_lists_test_user(self):
        with app.test_client() as client:            
            res = client.get('/', follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<li><a href="/users/1">Harry Potter</a></li>', html)

            test_user1 = User(id=2, first_name='Styles', last_name='Harry')
            db.session.add(test_user1)
            db.session.commit()

            res = client.get('/users')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<li><a href="/users/1">Harry Potter</a></li>', html)
            self.assertIn('<li><a href="/users/2">Styles Harry</a></li>', html)
            User.query.delete()

    def test_new_user_route(self):
        with app.test_client() as client:
            res = client.get('/users/new')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1>Create a New User</h1>', html)

    def test_create_new_user_form(self):
        User.query.delete()
        with app.test_client() as client:
           d = {'first_name': 'billy', 'last_name': 'bob', 'image_url': 'https://www.lovingly.com/wp-content/uploads/2019/09/red-rose-on-black-background.jpg'}
           res = client.post('/users/new', data=d, follow_redirects=True) 
           html = res.get_data(as_text=True)

           self.assertEqual(res.status_code, 200)
           self.assertIn('<a href="/users/1">billy bob</a>', html)

    def test_user_details_page(self):
        with app.test_client() as client:
            res = client.get(f"/users/{self.test_user_id}")
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<h2>First Name: Harry</h2>', html)

    def test_user_edit_page(self):
        with app.test_client() as client:
            res = client.get(f"/users/{self.test_user_id}/edit")
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<h2>First Name: Harry</h2>', html)
            self.assertIn('<button>Cancel Edits</button>', html)
            self.assertIn('</form>', html)

    def test_user_delete_page(self):
        with app.test_client() as client:
            res = client.post(f"/users/{self.test_user_id}/delete", follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertNotIn('Harry', html)
            self.assertNotIn('Potter', html)



