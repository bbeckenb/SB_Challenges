from unittest import TestCase
from app import app, session
from models import db, User, Feedback

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///test_user_feedback_db'
app.config['SQLALCHEMY_ECHO'] = False

# Disables CSRF on WTForms
app.config['WTF_CSRF_ENABLED'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()

class ViewFunctionFlaskTestCase(TestCase):
    """Tests view functions."""   
    
    def setUp(self):
        """Clean up existing users and feedbacks"""
        User.query.delete()
        test_user = User(username='beans4time', password='beepboop', email='beepboop@aol.com', first_name='tommy', last_name='pickles')
        db.session.add(test_user)
        db.session.commit()

        self.test_user = test_user

        Feedback.query.delete()
        test_feedback = Feedback(title='test_title', content='test_content', username=self.test_user.username)
        db.session.add(test_feedback)
        db.session.commit()

        self.test_feedback = test_feedback

    def tearDown(self):
        """Clean up any fouled transaction"""
        User.query.delete()
        Feedback.query.delete()

    def test_redirect_to_register_page(self):
        with app.test_client() as client:
            res = client.get('/') 

            self.assertEqual(res.status_code, 302) #reroute
            self.assertEqual(res.location, 'http://localhost/register')


    def test_rendering_of_registration_form(self):
        with app.test_client() as client:
            res = client.get('/register')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('Username', html)
            self.assertIn('Password', html)
            self.assertIn('</form>', html)

    def test_create_new_user_form(self):
        with app.test_client() as client:
           d = {'username': 'crabbydaddy', 'password': 'secret', 'email':'crabs4lyfe@gmail.com', 'first_name': 'billy', 'last_name': 'bob'}
           res = client.post('/register', data=d, follow_redirects=True) 
           html = res.get_data(as_text=True)

           crabbydaddy = User.query.get('crabbydaddy')
           self.assertIsNotNone(crabbydaddy)

    def test_rendering_of_login_form(self):
         with app.test_client() as client:
            res = client.get('/login')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('Username', html)
            self.assertIn('Password', html)
            self.assertIn('</form>', html)

    def test_login_user_form(self):
        with app.test_client() as client:
           test_user_to_authenticate = User.register_new_user('test_user_name', 'secret', 'test@gmail.com', 'test_fn', 'test_ln')
           db.session.add(test_user_to_authenticate)
           db.session.commit()

           d = {'username': 'test_user_name', 'password': 'secret'}
           res = client.post('/login', data=d, follow_redirects=True) 
           html = res.get_data(as_text=True)

           self.assertEqual(res.status_code, 200)
           self.assertIn('test_user_name', html)

    def test_logout(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session: 
                change_session['username'] = 'beans4time'
            res = client.get('/logout')
            html = res.get_data(as_text=True)
          

            self.assertEqual(res.status_code, 302)
            self.assertTrue('username' not in session)
    
    def test_user_details_page(self):
         with app.test_client() as client:
            with client.session_transaction() as change_session: 
                change_session['username'] = self.test_user.username
            res = client.get(f'/users/{self.test_user.username}', follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn(f'{self.test_user.username}', html)
            self.assertIn(f'{self.test_user.email}', html)
            self.assertIn('Delete User</button>', html)
            self.assertIn('test_title', html)

    def test_user_delete(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session: 
                change_session['username'] = self.test_user.username
            url = f"/users/{self.test_user.username}/delete"
            
            self.assertEqual(User.query.count(), 1)

            resp = client.post(url)

            self.assertEqual(resp.status_code, 302)
            self.assertEqual(User.query.count(), 0)

    def test_render_add_new_feedback_form_get(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session: 
                change_session['username'] = self.test_user.username
            url = f"/users/{self.test_user.username}/feedback/add"
        
            res = client.get(url)
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('Add Feedback</h1>', html)

    def test_render_add_new_feedback_form_post(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session: 
                change_session['username'] = self.test_user.username
            url = f"/users/{self.test_user.username}/feedback/add"
            d = {'title': 'test_title', 'content': 'test_content'}
            res = client.post(url, data=d, follow_redirects=True)

            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('test_title', html)
       


           