"""Models for Blogly"""
import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)


# MODELS GO BELOW
class User(db.Model):
    __tablename__ = 'users' #specifies table name

    id = db.Column(db.Integer,
                        primary_key=True,
                        autoincrement=True) #serial in sql

    first_name = db.Column(db.String(20),
                        nullable=False)

    last_name = db.Column(db.String(40),
                        nullable=False)

    image_url = db.Column(db.String(500), 
                        nullable=True, 
                        default='https://ih1.redbubble.net/image.2082102288.7860/tst,small,507x507-pad,600x600,f8f8f8.jpg')
    posts = db.relationship('Post', cascade='all, delete, delete-orphan', backref='users')

    def __repr__(self):
        u=self
        return f"<User first_name={u.first_name} last_name={u.last_name} image_url={u.image_url}>"

class Post(db.Model):
    """Post model"""

    __tablename__= "posts"
    
    id = db.Column(db.Integer,
                        primary_key=True,
                        autoincrement=True) #serial in sql
    title = db.Column(db.String(60),
                        nullable=False)
    content = db.Column(db.String,
                        nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())

    creator_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))



    def __repr__(self):
        p=self
        return f"<Post title={p.title} content={p.content} created_at={p.created_at} creator_id={p.creator_id}>"
