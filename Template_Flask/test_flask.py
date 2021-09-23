from unittest import TestCase

from app import app
from models import db #IMPORT MODELS HERE

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = #'postgresql:///test_db'
app.config['SQLALCHEMY_ECHO'] = False

# Disables CSRF on WTForms
app.config['WTF_CSRF_ENABLED'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()

class XModelTestCase(TestCase):
    """Tests for model for X."""   
    
    # def setUp(self):
    #     """Clean up existing users"""
    #     X.query.delete()
    #     test_user = X(id=1, first_name='Harry', last_name='Potter')
    #     db.session.add(test_user)
    #     db.session.commit()

    #     self.test_user = test_user


    # def tearDown(self):
    #     """Clean up any fouled transaction"""
    #     X.query.delete()

    # def test_redirect_to_users_page(self):
    #     with app.test_client() as client:
    #         res = client.get('/') 

    #         self.assertEqual(res.status_code, 302) #reroute
    #         self.assertEqual(res.location, 'http://localhost/users')

    # def test_new_user_route(self):
    #     with app.test_client() as client:
    #         res = client.get('/users/new')
    #         html = res.get_data(as_text=True)

    #         self.assertEqual(res.status_code, 200)
    #         self.assertIn('<h1>Create a New User</h1>', html)

    # def test_create_new_user_form(self):
    #     User.query.delete()
    #     with app.test_client() as client:
    #        d = {'first_name': 'billy', 'last_name': 'bob', 'image_url': 'https://www.lovingly.com/wp-content/uploads/2019/09/red-rose-on-black-background.jpg'}
    #        res = client.post('/users/new', data=d, follow_redirects=True) 
    #        html = res.get_data(as_text=True)

    #        self.assertEqual(res.status_code, 200)
    #        self.assertIn('<a href="/users/1">billy bob</a>', html)