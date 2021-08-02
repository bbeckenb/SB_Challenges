"""Blogly application."""

from flask import Flask, redirect, render_template, request, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy
from models import db, connect_db, User, Post, PostTag, Tag

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

app.config['SECRET_KEY'] = '?\xe6h\x01\xa6\x8bK\xce'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
# debug = DebugToolbarExtension(app)

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

    left_blank = False
    if first_name == '':
        flash('Please enter a first name to create a profile!', 'error')
        left_blank = True
    if last_name == '':
        left_blank = True
        flash('Please enter a last name to create a profile!', 'error')
    if image_url == '':
        image_url = None
    if left_blank:
        return render_template('new_user_form.html')
    else:
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

# #######################################
# Posts Routes
@app.route('/users/<int:user_id>/posts/new')
def add_new_post_for_user(user_id):
    """allows the user to create blog posts for a profile"""
    user = User.query.get_or_404(user_id)
    tags = Tag.query.all()
    return render_template('create_new_user_post.html', user=user, tags=tags)

@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def commits_new_post(user_id):
    """pulls in client info, creates a new post in the database, displays all user posts on their details.html page"""
    user = User.query.get_or_404(user_id)
    title = request.form['title']
    content = request.form['content']
    left_blank = False
    if title == '':
        flash('Please enter a title to create a post!', 'error')
        left_blank = True
    if content == '':
        flash('Please enter content to create a post!', 'error')
        left_blank = True
    if left_blank:
        return render_template('create_new_user_post.html', user=user)
    else:
        new_post = Post(title=title, content=content, creator_id=user_id)
        db.session.add(new_post)
        db.session.commit()

        tag_ids = request.form.getlist("tag_list")
        for t_id in tag_ids:
                new_post_tag = PostTag(tag_id=t_id, post_id=new_post.id)
                db.session.add(new_post_tag)
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
    tags = Tag.query.all()

    return render_template('edit_post_form.html', post=post, tags=tags)

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

    PostTag.query.filter(PostTag.post_id==post.id).delete()
    tag_ids = request.form.getlist("tag_list")
    for t_id in tag_ids:
        new_post_tag = PostTag(tag_id=t_id, post_id=post.id)
        db.session.add(new_post_tag)
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

# #######################################
# Tags Routes

@app.route('/tags')
def list_tags():
    """renders list of users"""
    tags = Tag.query.order_by(Tag.name).all()
    return render_template('list_tags.html', tags=tags)

@app.route('/tags/<int:tag_id>')
def tag_details(tag_id):
   tag = Tag.query.get_or_404(tag_id)
   posts = tag.posts 

   return render_template('tag_details.html', tag=tag, posts=posts)

@app.route('/tags/new', methods=['GET'])
def render_new_tag_page():
    """brings up form for user to enter a new tag"""

    return render_template('add_tag.html')

@app.route('/tags/new', methods=['POST'])
def commit_new_tag():
    """Creates new Tag instance and stores it in the database"""
    new_tag_name = request.form['tag_name']
    new_tag = Tag(name=new_tag_name)

    db.session.add(new_tag)
    db.session.commit()
    
    tags = Tag.query.order_by(Tag.name).all()
    return render_template("list_tags.html", tags=tags)

@app.route('/tags/<int:tag_id>/edit', methods=['GET'])
def render_edit_tag_page(tag_id):
    """brings up form for user to edit a tag"""
    tag = Tag.query.get(tag_id)

    return render_template('edit_tag.html', tag=tag)

@app.route('/tags/<int:tag_id>/edit', methods=['POST'])
def commit_tag_edit(tag_id):
    """Deletes post goes back to user details page"""
    new_tag_name = request.form['tag_name']
    tag = Tag.query.get(tag_id)

    if new_tag_name != '':
        tag.name = new_tag_name

    db.session.add(tag)
    db.session.commit()
   
    return redirect(f'/tags/{tag_id}')

@app.route('/tags/<int:tag_id>/delete', methods=['POST'])
def delete_tag(tag_id):
    """Deletes tag goes back to tag list page"""
    tag = Tag.query.get_or_404(tag_id)

    db.session.delete(tag)
    db.session.commit()
    
    tags = Tag.query.all()
    return render_template("list_tags.html", tags=tags)