"""Blogly application."""

from flask import Flask, redirect, render_template, request, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy
from models import db, connect_db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

app.config['SECRET_KEY'] = '?\xe6h\x01\xa6\x8bK\xce'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

@app.route('/')
def reroute_to_users():
    return redirect('/users')

@app.route('/users')
def users_list():
    """renders list of users"""
    users = User.query.all()
    return render_template('home.html', users=users)

@app.route('/users/new')
def create_new_user_landing_page():
    """landing page for form to create a new user"""

    return render_template('new_user_form.html')

@app.route('/users/new', methods=['POST'])
def create_user():
    """pulls in client info, creates a new user in the database, displays all users on main user list"""
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url']
    if image_url == '':
        image_url = None

    new_user = User(first_name=first_name, last_name=last_name, image_url=image_url)
    db.session.add(new_user)
    db.session.commit()
    return redirect('/users')

@app.route('/users/<int:user_id>')
def show_user(user_id):
    """shows details about a user"""
    user = User.query.get_or_404(user_id)

    return render_template("details.html", user=user)

@app.route('/users/<int:user_id>/edit')
def edit_user(user_id):
    """Gives option to change user attributes or cancel editing"""
    user = User.query.get_or_404(user_id)

    return render_template("edit_user.html", user=user)

@app.route('/users/<int:user_id>/edit', methods=['POST'])
def commit_edits(user_id):
    """Pushes desired edits to database then sends updates to client side"""
    user = User.query.get(user_id)
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url']
    edits_made = False
    if image_url != '':
        edits_made = True
        user.image_url = image_url
    if first_name != '':
        edits_made = True
        user.first_name = first_name
    if last_name != '':
        edits_made = True
        user.last_name = last_name
    if edits_made:
        db.session.add(user)
        db.session.commit()
    return redirect(f'/users/{user.id}')

@app.route('/users/<int:user_id>/delete', methods=['POST'])
def commit_delete(user_id):
    """Pushes desired edits to database then sends updates to client side"""
    
    User.query.filter(User.id==user_id).delete()
    db.session.commit()
    
    return redirect('/users')

