"""Blogly application."""

from flask import Flask, redirect, render_template, request, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy
from models import db, connect_db, User, Post

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
    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template('home.html', users=users)

@app.route('/users/new', methods=['GET'])
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

@app.route('/users/<int:user_id>', methods=['GET'])
def show_user(user_id):
    """shows details about a user"""
    user = User.query.get_or_404(user_id)
    posts = Post.query.filter(Post.creator_id == int(user_id))

    return render_template("details.html", user=user, posts=posts)

@app.route('/users/<int:user_id>/edit', methods=['GET'])
def edit_user(user_id):
    """Gives option to change user attributes or cancel editing"""
    user = User.query.get_or_404(user_id)

    return render_template("edit_user.html", user=user)

@app.route('/users/<int:user_id>/edit', methods=['POST'])
def commit_edits(user_id):
    """Pushes desired edits to database then sends updates to client side"""
    user = User.query.get_or_404(user_id)
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url']
    if image_url != '':
        user.image_url = image_url
    if first_name != '':
        user.first_name = first_name
    if last_name != '':
        user.last_name = last_name
    
    db.session.add(user)
    db.session.commit()
    return redirect(f'/users/{user.id}')

@app.route('/users/<int:user_id>/delete', methods=['POST'])
def commit_user_delete(user_id):
    """Pushes desired edits to database then sends updates to client side"""
    
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    
    return redirect('/users')

@app.route('/users/<int:user_id>/posts/new')
def add_new_post_for_user(user_id):
    """allows the user to create blog posts for a profile"""
    user = User.query.get_or_404(user_id)

    return render_template('create_new_user_post.html', user=user)

@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def commits_new_post(user_id):
    """pulls in client info, creates a new post in the database, displays all user posts on their details.html page"""
    
    title = request.form['title']
    content = request.form['content']

    new_post = Post(title=title, content=content, creator_id=user_id)
    db.session.add(new_post)
    db.session.commit()
    return redirect(f'/users/{user_id}')

@app.route('/posts/<int:post_id>')
def show_user_post(post_id):
    """allows the user to create blog posts for a profile"""
    post = Post.query.get_or_404(post_id)
    user = User.query.get_or_404(post.creator_id)

    return render_template('show_post.html', user=user, post=post)

@app.route('/posts/<int:post_id>/edit', methods=['GET'])
def edit_post_form(post_id):
    """goes to form to edit post"""
    post = Post.query.get_or_404(post_id)

    return render_template('edit_post_form.html', post=post)

@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def commit_post_edits(post_id):
    """goes to form to edit post"""
    post = Post.query.get_or_404(post_id)
    user = User.query.get_or_404(post.creator_id)

    title = request.form['title']
    content = request.form['content']
    if title != '':
        post.title = title
    if content != '':
        post.content = content

    db.session.add(post)
    db.session.commit()

    return render_template('show_post.html', post=post, user=user)

@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def delete_post(post_id):
    """Deletes post goes back to user details page"""
    post = Post.query.get_or_404(post_id)
    user = User.query.get_or_404(post.creator_id)
    posts = Post.query.filter(Post.creator_id == user.id)

    db.session.delete(post)
    db.session.commit()
    
    return render_template("details.html", user=user, posts=posts)

