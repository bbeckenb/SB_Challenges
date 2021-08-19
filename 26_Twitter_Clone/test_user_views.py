"""User View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_message_views.py


import os
from unittest import TestCase

from models import db, connect_db, Message, User, Follows, Likes

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
        Follows.query.delete()

        self.client = app.test_client()

        # Test User 0 
        test_user0 = User(email='test_email@test.com', 
                            username='harrypotter', 
                            password='HASHED_PASSWORD')
        db.session.add(test_user0)
        db.session.commit()

        self.test_user0 = test_user0
    # Test User 1
        test_user1 = User(email='test_email1@test.com', 
                            username='ronweasly', 
                            password='HASHED_PASSWORD')
        db.session.add(test_user1)
        db.session.commit()

        self.test_user1 = test_user1

    # Test Follow (User 0 follows User 1)
        user0_follows_user1 = Follows(user_being_followed_id=self.test_user1.id,
                                        user_following_id=self.test_user0.id)
        db.session.add(user0_follows_user1)
        db.session.commit()

        self.user0_follows_user1 = user0_follows_user1

        db.session.commit()

    def test_list_users_search(self):
        """checks 'search' query functionality"""
        with app.test_client() as client:
            res = client.get(f'/users', query_string={'q':'harry'})
            html = res.get_data(as_text=True)
            # username is present
            self.assertIn(f'<p>@{self.test_user0.username}</p>', html)

            res = client.get(f'/users', query_string={'q':'bobdylan'})
            html = res.get_data(as_text=True)
            # username is not present
            self.assertIn('<h3>Sorry, no users found</h3>', html)

    def test_list_users_search(self):
        """checks user list is populating"""
        with app.test_client() as client:
            res = client.get('/users')
            html = res.get_data(as_text=True)
            # username is present
            self.assertIn(f'<p>@{self.test_user0.username}</p>', html)
            self.assertIn(f'<p>@{self.test_user1.username}</p>', html)
           
    def test_users_show(self):
        """Tests that requested user profile comes up with messages"""

        test_msg = Message(text='heyyyy', user_id=self.test_user0.id)
        db.session.add(test_msg)
        db.session.commit()

        with app.test_client() as client:
            res = client.get(f'/users/{self.test_user0.id}')
            html = res.get_data(as_text=True)
            
            self.assertEqual(res.status_code, 200)
            self.assertIn(f'heyyyy', html)
            self.assertIn(f'<h4 id="sidebar-username">@{self.test_user0.username}</h4>', html)
            self.assertIn(f'<a href="/users/{self.test_user0.id}">@{self.test_user0.username}</a>', html)
            
    def test_users_show_id_DNE(self):
        """Tests that if user id does not exist 404 comes up"""
        with app.test_client() as client:
            res = client.get(f'/users/{self.test_user1.id+1}')
            html = res.get_data(as_text=True)
            
            self.assertEqual(res.status_code, 404)

    def test_following_users_listed(self):
         with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.test_user0.id
            # tests when a user is in session

            res = c.get(f"/users/{self.test_user0.id}/following")
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            # shows username of profile test_user0 is following
            self.assertIn(f'<p>@ronweasly</p>', html)

    def test_following_users_listed_no_user_in_session(self):
        p = self.test_user0.id
        
        with self.client as c:
            with c.session_transaction() as sess:
                if CURR_USER_KEY in sess:
                    del sess[CURR_USER_KEY]
            res = c.get(f"/users/{p}/following", follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertIn(f'<div class="alert alert-danger">Access unauthorized.</div>', html)

    def test_add_follow(self):
         test_user2 = User(email='test_email2@test.com', 
                            username='hagrid', 
                            password='HASHED_PASSWORD')
         db.session.add(test_user2)
         db.session.commit()
         
         p = test_user2.id

         with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.test_user0.id
            # tests when a user is in session

            res = c.post(f"/users/follow/{p}", follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            # shows username of new profile test_user0 is following
            self.assertIn(f'<p>@hagrid</p>', html)

    def test_add_follow_no_user_in_session(self):
        p = self.test_user0.id
        
        with self.client as c:
            with c.session_transaction() as sess:
                if CURR_USER_KEY in sess:
                    del sess[CURR_USER_KEY]
            res = c.post(f"/users/follow/{p}", follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertIn(f'<div class="alert alert-danger">Access unauthorized.</div>', html)

    def test_stop_follow(self):
         
        p = self.test_user1.id

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.test_user0.id
        # tests when a user is in session

        res = c.post(f"/users/stop-following/{p}", follow_redirects=True)
        html = res.get_data(as_text=True)

        self.assertEqual(res.status_code, 200)
        # shows username of new profile test_user0 is following, test_user1 should no longer be there
        self.assertNotIn(f'<p>@ronweasly</p>', html)

    def test_stop_follow_no_user_in_session(self):
        p = self.test_user0.id
        
        with self.client as c:
            with c.session_transaction() as sess:
                if CURR_USER_KEY in sess:
                    del sess[CURR_USER_KEY]
            res = c.post(f"/users/stop-following/{p}", follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertIn(f'<div class="alert alert-danger">Access unauthorized.</div>', html)

    def test_update_profile(self):
        """Make sure function properly updates user profile"""
        
        test_user2 = User.signup(email='test_email2@test.com', 
                            username='hagrid', 
                            password='HASHED_PASSWORD',
                            image_url='3')
        db.session.add(test_user2)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = test_user2.id
        # tests when a user is in session
        d = {'username': 'hagrid1', 'password':'HASHED_PASSWORD'}
        res = c.post(f"/users/profile", data=d, follow_redirects=True)
        html = res.get_data(as_text=True)

        self.assertEqual(res.status_code, 200)
        
        self.assertIn('<div class="alert alert-success">Profile successfully updated!</div>', html)

    def test_update_profile_with_same_username(self):
        """Test how function handles when a user tries to edit their username to be the same as another existing user (test_user1 in this case)"""
        
        test_user2 = User.signup(email='test_email2@test.com', 
                            username='hagrid', 
                            password='HASHED_PASSWORD',
                            image_url='3')
        db.session.add(test_user2)
        db.session.commit()

        p = self.test_user1.id

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = test_user2.id
        # tests when a user is in session
        d = {'username': 'ronweasly', 'password':'HASHED_PASSWORD'}
        res = c.post(f"/users/profile", data=d)
        html = res.get_data(as_text=True)

        self.assertEqual(res.status_code, 200)
        # shows username of new profile test_user0 is following, test_user1 should no longer be there
        self.assertIn('<div class="alert alert-danger">Username already taken</div>', html)

    def test_update_profile_with_wrong_password(self):
        """Test how function handles when a user tries to edit their info
        with a non-hashed/ wrong password"""

        test_user2 = User.signup(email='test_email2@test.com', 
                            username='hagrid', 
                            password='HASHED_PASSWORD',
                            image_url='3')
        db.session.add(test_user2)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = test_user2.id
        d = {'username': 'hagrid1', 'password':'wrong_password'}
        res = c.post(f"/users/profile", data=d, follow_redirects=True)
        html = res.get_data(as_text=True)

        self.assertEqual(res.status_code, 200)
        self.assertIn('<div class="alert alert-danger">Incorrect password</div>', html)

    def test_update_profile_no_user_in_session(self):
        with self.client as c:
            with c.session_transaction() as sess:
                if CURR_USER_KEY in sess:
                    del sess[CURR_USER_KEY]
            res = c.get(f"/users/profile", follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertIn(f'<div class="alert alert-danger">Access unauthorized.</div>', html)

    def test_add_like_user_not_in_session(self):
        test_msg = Message(text='heyyyy', user_id=self.test_user0.id)
        db.session.add(test_msg)
        db.session.commit()
        p = test_msg.id
        
        with self.client as c:
            with c.session_transaction() as sess:
                if CURR_USER_KEY in sess:
                    del sess[CURR_USER_KEY]
            res = c.post(f"/users/add_like/{p}", follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertIn(f'<div class="alert alert-danger">Access unauthorized.</div>', html)

    def test_add_like_msg_DNE(self):
        """Test how function handles when a user tries to like a message where the message id doesn't exist"""
        test_msg = Message(text='heyyyy', user_id=self.test_user0.id)
        db.session.add(test_msg)
        db.session.commit()
        p = test_msg.id

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.test_user0.id

        res = c.post(f"/users/add_like/{p+1}", follow_redirects=True)
        html = res.get_data(as_text=True)

        self.assertEqual(res.status_code, 404)
    
    def test_add_like_own_msg(self):
        """Test how function handles when a user tries to like a message of their own"""
        test_msg = Message(text='heyyyy', user_id=self.test_user0.id)
        db.session.add(test_msg)
        db.session.commit()
        p = test_msg.id

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.test_user0.id

        res = c.post(f"/users/add_like/{p}", follow_redirects=True)
        html = res.get_data(as_text=True)

        self.assertIn(f'<div class="alert alert-danger">You cannot like your own posts.</div>', html)

    def test_add_like_success(self):
        test_msg = Message(text='heyyyy', user_id=self.test_user0.id)
        db.session.add(test_msg)
        db.session.commit()
        p = test_msg.id

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.test_user1.id

        res = c.post(f"/users/add_like/{p}", follow_redirects=True)
        html = res.get_data(as_text=True)
        # Something interesting happening here with the "" and '
        self.assertIn('<div class="alert alert-success">You liked harrypotter&#39;s post!</div>', html)

    def test_delete_like_user_not_in_session(self):
        test_msg = Message(text='heyyyy', user_id=self.test_user0.id)
        db.session.add(test_msg)
        db.session.commit()
        p = test_msg.id
        
        with self.client as c:
            with c.session_transaction() as sess:
                if CURR_USER_KEY in sess:
                    del sess[CURR_USER_KEY]
            res = c.post(f"/users/delete_like/{p}", follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertIn(f'<div class="alert alert-danger">Access unauthorized.</div>', html)
    
    def test_delete_like_msg_DNE(self):
        """Test how function handles when a user tries to delete a like where the message id doesn't exist"""
        test_msg = Message(text='heyyyy', user_id=self.test_user0.id)
        db.session.add(test_msg)
        db.session.commit()
        p = test_msg.id

        test_like = Likes(user_id=self.test_user1.id, message_id=p)
        db.session.add(test_like)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.test_user1.id

        res = c.post(f"/users/delete_like/{p+1}", follow_redirects=True)
        html = res.get_data(as_text=True)

        self.assertEqual(res.status_code, 404)
    
    def test_delete_like_msg_not_in_likes(self):
        test_msg = Message(text='heyyyy', user_id=self.test_user0.id)
        db.session.add(test_msg)
        db.session.commit()
        p = test_msg.id

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.test_user1.id

        res = c.post(f"/users/delete_like/{p}", follow_redirects=True)
        html = res.get_data(as_text=True)

        self.assertIn(f'<div class="alert alert-danger">Cannot perform requested action.</div>', html)
    
    def test_delete_like_msg_success(self):
        test_msg = Message(text='heyyyy', user_id=self.test_user0.id)
        db.session.add(test_msg)
        db.session.commit()
        p = test_msg.id

        test_like = Likes(user_id=self.test_user1.id, message_id=p)
        db.session.add(test_like)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.test_user1.id

        res = c.post(f"/users/delete_like/{p}", follow_redirects=True)
        html = res.get_data(as_text=True)

        self.assertIn('<div class="alert alert-success">You un-liked harrypotter&#39;s post!</div>', html)
    
    def test_delete_user_user_not_in_session(self):
        
        with self.client as c:
            with c.session_transaction() as sess:
                if CURR_USER_KEY in sess:
                    del sess[CURR_USER_KEY]
            res = c.post(f"/users/delete", follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertIn(f'<div class="alert alert-danger">Access unauthorized.</div>', html)

    def test_delete_user_success(self):
        
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.test_user0.id
            res = c.post(f"/users/delete", follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(len(User.query.all()), 1) #test_user1 still in db
            self.assertIn('<h2 class="join-message">Join Warbler today.</h2>', html)
    
    
    # def test_add_message_user(self):
    #     """Can user add a message?"""

    #     # Since we need to change the session to mimic logging in,
    #     # we need to use the changing-session trick:

    #     with self.client as c:
    #         with c.session_transaction() as sess:
    #             sess[CURR_USER_KEY] = self.testuser.id

    #         # Now, that session setting is saved, so we can have
    #         # the rest of ours test

    #         res = c.post("/messages/new", data={"text": "Hello"})

    #         # Make sure it redirects
    #         self.assertEqual(res.status_code, 302)

    #         msg = Message.query.one()
    #         self.assertEqual(msg.text, "Hello")

    # def test_add_message_non_user(self):
    #     """Can non-user add a message?"""
    #         # Test that if a user is not logged in, they redirect to home anon
    #     with self.client as c:
    #         with c.session_transaction() as sess:
    #             if CURR_USER_KEY in sess:
    #                 del sess[CURR_USER_KEY]

    #         res = c.post("/messages/new", data={"text": "Hello"}, follow_redirects=True)
    #         html = res.get_data(as_text=True)

    #         # Make sure it redirects to home page for non-users
    #         self.assertEqual(res.status_code, 200)
    #         # Renders home-anon.html
    #         self.assertIn('<h4>New to Warbler?</h4>', html)

    #         msg = Message.query.all()
    #         # no messages should exist
    #         self.assertEqual(len(msg), 0)

    # def test_messages_show(self):
    #     # create test message to 'show'
    #     msg = Message(text='Hello', user_id=self.testuser.id)
    #     db.session.add(msg)
    #     db.session.commit()

    #     with app.test_client() as client:
    #         res = client.get(f'/messages/{msg.id}')
    #         html = res.get_data(as_text=True)

    #         # status code 200
    #         self.assertEqual(res.status_code, 200)
    #         # message we created above has its text rendered in expected html format
    #         self.assertIn('<p class="single-message">Hello</p>', html)
    
    # def test_messages_show_with_bad_msg_id(self):
    #     # create test message to 'show'
    #     msg = Message(text='Hello', user_id=self.testuser.id)
    #     db.session.add(msg)
    #     db.session.commit()

    #     with app.test_client() as client:
    #         res = client.get(f'/messages/{msg.id + 1}')

    #         # status code 404 because we fed the route a nonexistent msg id
    #         self.assertEqual(res.status_code, 404)

    # def test_messages_destroy_with_valid_user(self):
    #     with self.client as c:
    #         with c.session_transaction() as sess:
    #             sess[CURR_USER_KEY] = self.testuser.id

    #         msg = Message(text='Hello', user_id=self.testuser.id)
    #         db.session.add(msg)
    #         db.session.commit()

    #         res = c.post(f"/messages/{msg.id}/delete", follow_redirects=True)
    #         html = res.get_data(as_text=True)

    #         self.assertEqual(res.status_code, 200)
    #         # Follows to the user details page shows the user has 0 messages associated with the account now
    #         self.assertIn(f'<a href="/users/{self.testuser.id}">0</a>', html)

    # def test_messages_destroy_with_no_user(self):
    #     msg = Message(text='Hello', user_id=self.testuser.id)
    #     db.session.add(msg)
    #     db.session.commit()
        
    #     print('****************', msg.id)
    #     with self.client as c:
    #         with c.session_transaction() as sess:
    #             if CURR_USER_KEY in sess:
    #                 del sess[CURR_USER_KEY]

    #         res = c.post(f"/messages/{msg.id}/delete", follow_redirects=True)
    #         html = res.get_data(as_text=True)

    #         self.assertEqual(res.status_code, 200)
    #         # Follows to the user details page shows the user has 0 messages associated with the account now
    #         self.assertIn(f'<div class="alert alert-danger">Access unauthorized.</div>', html)




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