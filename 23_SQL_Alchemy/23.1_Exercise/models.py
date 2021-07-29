"""Models for Blogly."""

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

    def __repr__(self):
        u=self
        return f"<User first_name={u.first_name} last_name={u.last_name} image_url={u.image_url}>"