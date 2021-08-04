from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
# best practice to create function to establish connection and only call it once
def connect_db(app):
    db.app = app
    db.init_app(app)

class Pet(db.Model):
    """Model represents pets table"""
    __tablename__ = 'pets'

    id = db.Column(db.Integer,
                    primary_key=True,
                    autoincrement=True)
    name = db.Column(db.Text, nullable=False)
    species = db.Column(db.Text, nullable=False)
    photo_url = db.Column(db.Text, default='https://static9.depositphotos.com/1000792/1134/v/600/depositphotos_11348824-stock-illustration-cat-and-dog.jpg')
    age = db.Column(db.Integer)
    notes = db.Column(db.Text)
    available = db.Column(db.Boolean, nullable=False, default=True)



# MODELS GO BELOW

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