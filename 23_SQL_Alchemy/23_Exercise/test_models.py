from unittest import TestCase
from app import app
from models import db, User, Post

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///test_blogly_db'
app.config['SQLALCHEMY_ECHO'] = False

db.drop_all()
db.create_all()

class UserModelTestCase(TestCase):
    """Tests User model"""

    def setUp(self):
        """Clean up existing users"""
        User.query.delete()
        test_user = User(id=1, first_name='Harry', last_name='Potter', image_url='https://cdn.vox-cdn.com/thumbor/7n7Oe4myr7B7nYI-mxuuO3b-QrY=/150x0:1770x1215/1200x800/filters:focal(150x0:1770x1215)/cdn.vox-cdn.com/uploads/chorus_image/image/35330556/3176173-1748009911-hp.jp_.0.jpg')
        db.session.add(test_user)
        db.session.commit()

        self.test_user = test_user

        test_post = Post(title='Title', content='This is the content', creator_id=test_user.id)
        db.session.add(test_post)
        db.session.commit()

        self.test_post=test_post

    def tearDown(self):
        """Clean up any fouled transaction"""
        User.query.delete()
        Post.query.delete()

    def test_user__repr__(self):
        """Checks what User.__repr__ outputs"""
        db.session.add(self.test_user)
        db.session.commit()

        self.assertEqual(repr(self.test_user), "<User first_name=Harry last_name=Potter image_url=https://cdn.vox-cdn.com/thumbor/7n7Oe4myr7B7nYI-mxuuO3b-QrY=/150x0:1770x1215/1200x800/filters:focal(150x0:1770x1215)/cdn.vox-cdn.com/uploads/chorus_image/image/35330556/3176173-1748009911-hp.jp_.0.jpg>")

    def test_post__repr__(self):
        """Checks what Post.__repr__ outputs"""
        db.session.add(self.test_post)
        db.session.commit()

        self.assertEqual(repr(self.test_post), f"<Post title=Title content=This is the content created_at={self.test_post.created_at} creator_id={self.test_user.id}>")

    