"""Blogly application."""

from flask import Flask, jsonify, redirect, render_template, request, flash, session
import flask
from flask_debugtoolbar import DebugToolbarExtension
from forms import UserRegistrationForm, UserLoginForm, FeedbackForm
from models import db, connect_db, User, Feedback
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///user_feedback_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

app.config['SECRET_KEY'] = '\xda\n\xb4N0|\x15\xb8\x0c"\x17\xd5$\xf1RO' #python3 import random, random.randbytes(n)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

#Example View Functions
@app.route('/')
def redirect_to_registration():
    return redirect('/register')

@app.route('/register', methods=['GET', 'POST'])
def display_registration_form():
    form = UserRegistrationForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data    
        first_name = form.first_name.data
        last_name = form.last_name.data
        new_user = User.register_new_user(username, password, email, first_name, last_name)
        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username is taken, please choose a different one')
            return render_template('registration_form.html', form=form)
        flask.session['username'] = new_user.username
        flash('Welcome! Successfully Created Your Account!', "success")
        return redirect(f'/users/{username}')
    else:
        return render_template('registration_form.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def display_login_form():
    form = UserLoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        curr_user = User.authenticate_user(username, password)
        if curr_user:
            flask.session['username'] = curr_user.username
            flash(f"Welcome Back, {curr_user.username}!", "primary")
            return redirect(f"/users/{curr_user.username}")
        else:
            flash('User credentials invalid', 'error')
    return render_template('login_form.html', form=form)

@app.route('/logout')
def logout_user():
    session.pop('username')
    flash('Goodbye!', 'info')
    return redirect('/')

@app.route('/users/<string:username>')
def show_user_details(username):
    if "username" not in session:
        flash("Please login first!", "danger")
        return redirect('/login')
    user = User.query.get_or_404(username)
    feedbacks = user.feedbacks
    return render_template('user_details.html', user=user, feedbacks=feedbacks)

@app.route('/users/<string:username>/delete', methods=['POST'])
def delete_user(username):
    if "username" not in session:
        flash("Please login first!", "danger")
        return redirect('/login')
    if username != session['username']:
        flash("You do not have authorization to delete this account!", "danger")
        return redirect(f'/users/{username}')
    user = User.query.get_or_404(username)
    db.session.delete(user)
    db.session.commit()
    return redirect('/logout')

@app.route('/users/<string:username>/feedback/add', methods=['GET', 'POST'])
def user_add_feedback(username):
    if "username" not in session:
        flash("Please login first!", "danger")
        return redirect('/login')

    form = FeedbackForm()
    if form.validate_on_submit():
       title = form.title.data
       content = form.content.data
       new_feedback = Feedback(title=title, content=content, username=username)
       db.session.add(new_feedback)
       db.session.commit()
       return redirect(f'/users/{username}') 
    else:
        return render_template('add_feedback.html', form=form)

@app.route('/feedback/<int:feedback_id>/update', methods=['GET', 'POST'])
def user_update_feedback(feedback_id):
    if "username" not in session:
        flash("Please login first!", "danger")
        return redirect('/login')

    feedback = Feedback.query.get_or_404(feedback_id)
    form = FeedbackForm(obj=feedback)
    user = feedback.user
    if user.username != session['username']:
        flash("You do not have authorization to change this feedback!", "danger")
        return redirect(f'/users/{user.username}')
    if form.validate_on_submit():
       feedback.title = form.title.data
       feedback.content = form.content.data
       db.session.commit()
       return redirect(f'/users/{user.username}') 
    else:
        return render_template('update_feedback.html', form=form)
  
@app.route('/feedback/<int:feedback_id>/delete', methods=['POST'])
def delete_feedback(feedback_id):
    if "username" not in session:
        flash("Please login first!", "danger")
        return redirect('/login')
    feedback = Feedback.query.get_or_404(feedback_id)
    user = feedback.user
    if user.username != session['username']:
        flash("You do not have authorization to change this feedback!", "danger")
        return redirect(f'/users/{user.username}')
    db.session.delete(feedback)
    db.session.commit()
    return redirect(f'/users/{user.username}')
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