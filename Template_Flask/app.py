"""Blogly application."""

from flask import Flask, jsonify, redirect, render_template, request, flash, session
from flask_debugtoolbar import DebugToolbarExtension
# from forms import # Forms
from models import db, connect_db # Models

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = #'postgresql:///pet_adoption_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

app.config['SECRET_KEY'] = '\x0b\xcd\xe8\x8d\x9f\xe2)\xa6^\x00?.\xa0\x1e\x9d\xe3' #python3 import random, random.randbytes(n)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

#Example View Functions
# @app.route('/')
# def reroute_to_users():
#     return redirect('/users')

# @app.route('/users')
# def users_list():
#     """renders list of users"""
#     users = User.query.order_by(User.last_name, User.first_name).all()
#     return render_template('home.html', users=users)

# @app.route('/users/new', methods=['GET'])
# def create_new_user_landing_page():
#     """landing page for form to create a new user"""

#     return render_template('new_user_form.html')

# @app.route('/users/new', methods=['POST'])
# def create_user():
#     """pulls in client info, creates a new user in the database, displays all users on main user list"""
#     first_name = request.form['first_name']
#     last_name = request.form['last_name']
#     image_url = request.form['image_url']

#     left_blank = False
#     if first_name == '':
#         flash('Please enter a first name to create a profile!', 'error')
#         left_blank = True
#     if last_name == '':
#         left_blank = True
#         flash('Please enter a last name to create a profile!', 'error')
#     if image_url == '':
#         image_url = None
#     if left_blank:
#         return render_template('new_user_form.html')
#     else:
#         new_user = User(first_name=first_name, last_name=last_name, image_url=image_url)
#         db.session.add(new_user)
#         db.session.commit()
#         return redirect('/users')

# @app.route('/users/<int:user_id>', methods=['GET'])
# def show_user(user_id):
#     """shows details about a user"""
#     user = User.query.get_or_404(user_id)
#     posts = Post.query.filter(Post.creator_id == int(user_id))

#     return render_template("details.html", user=user, posts=posts)

# @app.route('/users/<int:user_id>/edit', methods=['GET'])
# def edit_user(user_id):
#     """Gives option to change user attributes or cancel editing"""
#     user = User.query.get_or_404(user_id)

#     return render_template("edit_user.html", user=user)

# @app.route('/users/<int:user_id>/edit', methods=['POST'])
# def commit_edits(user_id):
#     """Pushes desired edits to database then sends updates to client side"""
#     user = User.query.get_or_404(user_id)
#     first_name = request.form['first_name']
#     last_name = request.form['last_name']
#     image_url = request.form['image_url']
#     if image_url != '':
#         user.image_url = image_url
#     if first_name != '':
#         user.first_name = first_name
#     if last_name != '':
#         user.last_name = last_name
    
#     db.session.add(user)
#     db.session.commit()
#     return redirect(f'/users/{user.id}')

# @app.route('/users/<int:user_id>/delete', methods=['POST'])
# def commit_user_delete(user_id):
#     """Pushes desired edits to database then sends updates to client side"""
    
#     user = User.query.get_or_404(user_id)
#     db.session.delete(user)
#     db.session.commit()
    
#     return redirect('/users')