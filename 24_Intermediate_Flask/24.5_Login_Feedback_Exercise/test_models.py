from unittest import TestCase

from app import app
from models import db, User
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

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

class UserModelTestCase(TestCase):
    """Tests for model for User."""

    def setUp(self):
        """Clean up existing users"""
        User.query.delete()
        test_user = User(username='beans4time', password='beepboop', email='beepboop@aol.com', first_name='tommy', last_name='pickles')
        db.session.add(test_user)
        db.session.commit()

        self.test_user = test_user


    def tearDown(self):
        """Clean up any fouled transaction"""
        User.query.delete()

    def test_user__repr__(self):
        """Checks what User.__repr__ outputs"""

        self.assertEqual(repr(self.test_user), "<User username=beans4time password=beepboop email=beepboop@aol.com first_name=tommy last_name=pickles>")

    def test_user_register_new_user_cls_method(self):
        """Tests User.register_new_user bcrypt"""
        test_user2 = User.register_new_user('test_user_name', 'secret', 'test@gmail.com', 'test_fn', 'test_ln')

        self.assertEqual(test_user2.username, 'test_user_name')
        self.assertNotEqual(test_user2.password, 'secret')
        self.assertEqual(test_user2.email, 'test@gmail.com')
        self.assertEqual(test_user2.first_name, 'test_fn')
        self.assertEqual(test_user2.last_name, 'test_ln')

    def test_user_class_authenticate_user_method(self):
        """Tests an existing user logging in, having their username to pull the password in database, then comparing that to the password typed in
        Returns User instance obj if authenticated, bool False if not"""
        test_user_False = User.authenticate_user('test_user_name', 'secret')
        
        self.assertFalse(test_user_False)

        test_user_Pass = User.register_new_user('test_user_name', 'secret', 'test@gmail.com', 'test_fn', 'test_ln')
        db.session.add(test_user_Pass)
        db.session.commit()

        test_user_Pass1 = User.authenticate_user('test_user_name', 'secret')

        self.assertFalse(test_user_False)
        self.assertEqual(test_user_Pass1.email, 'test@gmail.com')


        