"""Message View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_message_views.py


import os
from unittest import TestCase

from models import db, connect_db, Message, User

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app, CURR_USER_KEY

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()

# Don't have WTForms use CSRF at all, since it's a pain to test

app.config['WTF_CSRF_ENABLED'] = False


class MessageViewTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()

        self.client = app.test_client()

        self.testuser = User.signup(username="testuser",
                                    email="test@test.com",
                                    password="testuser",
                                    image_url=None)

        db.session.commit()

    def test_add_message_user(self):
        """Can user add a message?"""

        # Since we need to change the session to mimic logging in,
        # we need to use the changing-session trick:

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            # Now, that session setting is saved, so we can have
            # the rest of ours test

            res = c.post("/messages/new", data={"text": "Hello"})

            # Make sure it redirects
            self.assertEqual(res.status_code, 302)

            msg = Message.query.one()
            self.assertEqual(msg.text, "Hello")

    def test_add_message_non_user(self):
        """Can non-user add a message?"""
            # Test that if a user is not logged in, they redirect to home anon
        with self.client as c:
            with c.session_transaction() as sess:
                if CURR_USER_KEY in sess:
                    del sess[CURR_USER_KEY]

            res = c.post("/messages/new", data={"text": "Hello"}, follow_redirects=True)
            html = res.get_data(as_text=True)

            # Make sure it redirects to home page for non-users
            self.assertEqual(res.status_code, 200)
            # Renders home-anon.html
            self.assertIn('<h4>New to Warbler?</h4>', html)

            msg = Message.query.all()
            # no messages should exist
            self.assertEqual(len(msg), 0)

    def test_messages_show(self):
        # create test message to 'show'
        msg = Message(text='Hello', user_id=self.testuser.id)
        db.session.add(msg)
        db.session.commit()

        with app.test_client() as client:
            res = client.get(f'/messages/{msg.id}')
            html = res.get_data(as_text=True)

            # status code 200
            self.assertEqual(res.status_code, 200)
            # message we created above has its text rendered in expected html format
            self.assertIn('<p class="single-message">Hello</p>', html)
    
    def test_messages_show_with_bad_msg_id(self):
        # create test message to 'show'
        msg = Message(text='Hello', user_id=self.testuser.id)
        db.session.add(msg)
        db.session.commit()

        with app.test_client() as client:
            res = client.get(f'/messages/{msg.id + 1}')

            # status code 404 because we fed the route a nonexistent msg id
            self.assertEqual(res.status_code, 404)

    def test_messages_destroy_with_valid_user(self):
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            msg = Message(text='Hello', user_id=self.testuser.id)
            db.session.add(msg)
            db.session.commit()

            res = c.post(f"/messages/{msg.id}/delete", follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            # Follows to the user details page shows the user has 0 messages associated with the account now
            self.assertIn(f'<a href="/users/{self.testuser.id}">0</a>', html)

    def test_messages_destroy_with_no_user(self):
        msg = Message(text='Hello', user_id=self.testuser.id)
        db.session.add(msg)
        db.session.commit()
        
        print('****************', msg.id)
        with self.client as c:
            with c.session_transaction() as sess:
                if CURR_USER_KEY in sess:
                    del sess[CURR_USER_KEY]

            res = c.post(f"/messages/{msg.id}/delete", follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            # Follows to the user details page shows the user has 0 messages associated with the account now
            self.assertIn(f'<div class="alert alert-danger">Access unauthorized.</div>', html)




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
