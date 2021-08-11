from enum import unique
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()

bcrypt = Bcrypt()
# best practice to create function to establish connection and only call it once
def connect_db(app):
    db.app = app
    db.init_app(app)


# MODELS GO BELOW

class User(db.Model):
    __tablename__ = 'users'

    username = db.Column(db.String(20), primary_key=True, unique=True, nullable=False)

    password = db.Column(db.Text, nullable=False)

    email = db.Column(db.String(50), nullable=False, unique=True)

    first_name = db.Column(db.String(30), nullable=False)

    last_name = db.Column(db.String(30), nullable=False)

    feedbacks = db.relationship('Feedback', cascade='all, delete, delete-orphan', backref='user')

    def __repr__(self):
        u = self
        return f"<User username={u.username} password={u.password} email={u.email} first_name={u.first_name} last_name={u.last_name}>"

    @classmethod
    def register_new_user(cls, username, pw, email, first_n, last_n):
        """Generates salt and combines with password to then pass through hash function
        Stores all credentials in database"""
        pw_hash = bcrypt.generate_password_hash(pw)

        pw_hash_utf8 = pw_hash.decode("utf8")

        return cls(username=username, password=pw_hash_utf8, email=email, first_name=first_n, last_name=last_n)

    @classmethod
    def authenticate_user(cls, username, pw):
        """Pulls user info from database based on username (pk), 
        compares password from login attempt to what is stored in database
        
        if user is authentic, return user instance, if not, return bool False
        """

        curr_user = User.query.filter_by(username=username).first()

        if curr_user and bcrypt.check_password_hash(curr_user.password, pw):
            return curr_user
        else:
            return False

class Feedback(db.Model):
    __tablename__ = 'feedbacks'

    id = db.Column(db.Integer,
                        primary_key=True,
                        autoincrement=True)
    title = db.Column(db.String(100), nullable=False)

    content = db.Column(db.Text, nullable=False)
    
    username = db.Column(db.String(20), db.ForeignKey('users.username', ondelete='CASCADE'))






# EXAMPLES
# Examples of models
# class User(db.Model):
#     __tablename__ = 'users' #specifies table name

#     id = db.Column(db.Integer,
#                         primary_key=True,
#                         autoincrement=True) #serial in sql

#     first_name = db.Column(db.String(20),
#                         nullable=False)

#     last_name = db.Column(db.String(40),
#                         nullable=False)

#     image_url = db.Column(db.String(500), 
#                         nullable=True, 
#                         default='https://ih1.redbubble.net/image.2082102288.7860/tst,small,507x507-pad,600x600,f8f8f8.jpg')
#     posts = db.relationship('Post', cascade='all, delete, delete-orphan', backref='users')

#     def __repr__(self):
#         u=self
#         return f"<User first_name={u.first_name} last_name={u.last_name} image_url={u.image_url}>"

# class Post(db.Model):
#     """Post model"""

#     __tablename__ = "posts"
    
#     id = db.Column(db.Integer,
#                         primary_key=True,
#                         autoincrement=True) #serial in sql
#     title = db.Column(db.String(60),
#                         nullable=False)
#     content = db.Column(db.String,
#                         nullable=False)
#     created_at = db.Column(db.DateTime, default=datetime.datetime.now())

#     creator_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))

#     # assignment = db.relationship('PostTag', cascade='all, delete, delete-orphan', backref='post')

#     tags = db.relationship('Tag', secondary='posts_tags', backref='posts')

#     def __repr__(self):
#         p=self
#         return f"<Post title={p.title} content={p.content} created_at={p.created_at} creator_id={p.creator_id}>"


# class Tag(db.Model):
#     """Tags for posts"""
    
#     __tablename__ = "tags"

#     id = db.Column(db.Integer, 
#                     primary_key=True,
#                     autoincrement=True)
    
#     name = db.Column(db.Text,
#                     unique=True,
#                     nullable=False)
    
#     # assignments = db.relationship('PostTag', cascade='all, delete, delete-orphan', backref='tags')

# class PostTag(db.Model):
#     """Middle table connecting posts table to tags table"""
    
#     __tablename__ = "posts_tags"

#     post_id = db.Column(db.Integer, db.ForeignKey('posts.id', ondelete='CASCADE'), primary_key=True, nullable=False)

#     tag_id = db.Column(db.Integer, db.ForeignKey('tags.id', ondelete='CASCADE'), primary_key=True, nullable=False)