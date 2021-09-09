"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase

from models import db, User, Message, Follows

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()


class UserModelTestCase(TestCase):
    """Test User Model methods."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()
        Follows.query.delete()
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

        self.client = app.test_client()


    def tearDown(self):
        """Clean up any fouled transaction"""
        User.query.delete()
        Message.query.delete()
        Follows.query.delete()

    def test_user_model(self):
        """Does basic model work?"""

        u = User(
            email="test@test.com",
            username="testuser",
            password="HASHED_PASSWORD"
        )

        db.session.add(u)
        db.session.commit()

        # User should have no messages & no followers
        self.assertEqual(len(u.messages), 0)
        self.assertEqual(len(u.followers), 0)

    def test_user__repr__(self):
        """Checks that User.__repr__ outputs what is expected"""
        
        self.assertEqual(repr(self.test_user0), f"<User #{self.test_user0.id}: harrypotter, test_email@test.com>")

    def test_if_following_method(self):
        """'is_following' produces bool True if a user Follows a specified user as tracked by 'follows' table in the database.
        Will return False if a connection does not exist in the database"""
      
        # Testing test_user0 'follows' test_user1 (should produce True as a test Follows instance was created in test setup)
        self.assertTrue(self.test_user0.is_following(self.test_user1))
        
        # Testing that test_user1 'follows' test_user0 (should produce False, as no connection exists in that direction)
        self.assertFalse(self.test_user1.is_following(self.test_user0))

    def test_is_followed_by_method(self):
        """'is_followed_by' produces bool True if a user is followed by a specified user as tracked by 'follows' table in the database.
        Will return False if a connection does not exist in the database"""

        # Testing test_user1 'is followed by' test_user0 (should produce True as a test Follows instance was created in test setup)
        self.assertTrue(self.test_user1.is_followed_by(self.test_user0))
        
        # Testing that test_user0 'is followed by' test_user1 (should produce False, as no connection exists in that direction)
        self.assertFalse(self.test_user0.is_followed_by(self.test_user1))
    
    def test_user_class_signup_method(self):
        """Takes in required User inputs adds a new User instance to SQLAlchemy's staging area"""
        test_user2 = User.signup(
                    username='ppp',
                    password='pwpwpw',
                    email='beans@gmail.com',
                    image_url=User.image_url.default.arg
                )
        # ID will not be assigned until the new User instance is committed (will be None)
        self.assertIsNone(test_user2.id)

        # but other attributes should be available to check
        self.assertEqual(test_user2.username, 'ppp')
        self.assertEqual(test_user2.email, 'beans@gmail.com')
        self.assertEqual(test_user2.image_url, User.image_url.default.arg)

        # Note password will be hashed so we will ensure it is not equivalent to the raw string input for the test user
        self.assertNotEqual(test_user2.password, 'pwpwpw')

        # clear test_user2 from the staging area
        db.session.rollback()

    def test_user_class_method_authenticate(self):
        """Find user with `username` and `password`.

        This is a class method (call it on the class, not an individual user.)
        It searches for a user whose password hash matches this password
        and, if it finds such a user, returns that user object.

        If can't find matching user (or if password is wrong), returns False.

        """

        test_user2 = User.signup(
                    username='ppp',
                    password='pwpwpw',
                    email='beans@gmail.com',
                    image_url=User.image_url.default.arg
                )
        db.session.commit()

        # Does User.authenticate successfully return a user when given a valid username and password?
        self.assertEqual(User.authenticate(test_user2.username, 'pwpwpw'), test_user2)
        
        # Does User.authenticate fail to return a user when the username is invalid?
        self.assertFalse(User.authenticate('nottest_user2_username', 'pwpwpw'))

        # Does User.authenticate fail to return a user when the password is invalid?
        self.assertFalse(User.authenticate(test_user2.username, 'notpassword'))