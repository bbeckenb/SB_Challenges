"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase
from datetime import datetime

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
    """Test views for messages."""

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

        test_message0 = Message(text='test message',
                                timestamp=datetime.utcnow(),
                                user_id=test_user0.id
                                )
        
        db.session.add(test_message0)
        db.session.commit()

        self.test_message0 = test_message0

        self.client = app.test_client()


    def tearDown(self):
        """Clean up any fouled transaction"""
        User.query.delete()
        Message.query.delete()
        Follows.query.delete()

    def test_user_model(self):
        """Does basic model work? Do SQLAlchemy relationships work as expected"""

        m = Message(text='test message',
                    timestamp=datetime.utcnow(),
                    user_id=self.test_user0.id
                    )

        db.session.add(m)
        db.session.commit()

        # User should have 2 messages (one from set up one from this specific test)
        # The user relationship should show that test_user0 is connected to the message
        self.assertEqual(len(self.test_user0.messages), 2)
        self.assertEqual(m.user, self.test_user0)

