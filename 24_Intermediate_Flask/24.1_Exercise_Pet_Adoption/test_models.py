from unittest import TestCase

from app import app
from models import db #IMPORT MODELS HERE

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///test_pet_adoption_db'
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

    # def test_user__repr__(self):
    #     """Checks what User.__repr__ outputs"""
    #     db.session.add(self.test_user)
    #     db.session.commit()

    #     self.assertEqual(repr(self.test_user), "<User first_name=Harry last_name=Potter image_url=https://cdn.vox-cdn.com/thumbor/7n7Oe4myr7B7nYI-mxuuO3b-QrY=/150x0:1770x1215/1200x800/filters:focal(150x0:1770x1215)/cdn.vox-cdn.com/uploads/chorus_image/image/35330556/3176173-1748009911-hp.jp_.0.jpg>")

    # def test_post__repr__(self):
    #     """Checks what Post.__repr__ outputs"""
    #     db.session.add(self.test_post)
    #     db.session.commit()

    #     self.assertEqual(repr(self.test_post), f"<Post title=Title content=This is the content created_at={self.test_post.created_at} creator_id={self.test_user.id}>")
        