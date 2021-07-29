from unittest import TestCase
from app import app
from models import db, User

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///test_blogly_db'
app.config['SQLALCHEMY_ECHO'] = False

db.drop_all()
db.create_all()

class UserModelTestCase(TestCase):
    """Tests User model"""

    def setUp(self):
        """Clean up existing users"""
        User.query.delete()

    def tearDown(self):
        """Clean up any fouled transaction"""
        db.session.rollback()

    def test__repr__(self):
        """Checks what __repr__ outputs"""
        test_user = User(first_name='Harry', last_name='Potter', image_url='https://cdn.vox-cdn.com/thumbor/7n7Oe4myr7B7nYI-mxuuO3b-QrY=/150x0:1770x1215/1200x800/filters:focal(150x0:1770x1215)/cdn.vox-cdn.com/uploads/chorus_image/image/35330556/3176173-1748009911-hp.jp_.0.jpg')
        db.session.add(test_user)
        db.session.commit()

        self.assertEqual(repr(test_user), "<User first_name=Harry last_name=Potter image_url=https://cdn.vox-cdn.com/thumbor/7n7Oe4myr7B7nYI-mxuuO3b-QrY=/150x0:1770x1215/1200x800/filters:focal(150x0:1770x1215)/cdn.vox-cdn.com/uploads/chorus_image/image/35330556/3176173-1748009911-hp.jp_.0.jpg>")