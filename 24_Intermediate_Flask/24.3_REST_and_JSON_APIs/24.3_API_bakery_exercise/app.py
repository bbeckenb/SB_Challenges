"""Blogly application."""
from flask import Flask, jsonify, redirect, render_template, request, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from forms import AddCupcakeForm
from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

app.config['SECRET_KEY'] = '\x0c0\x0b0\xc5\x8f\x95`\xb6\x0bN\xb1n{+Y' #python3 import random, random.randbytes(n)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

@app.route('/')
def index_page():
    cupcakes = Cupcake.query.all()
    form = AddCupcakeForm()
    return render_template('list_all_cupcakes.html', cupcakes=cupcakes, form=form)

@app.route('/api/cupcakes')
def list_all_cupcakes():
    all_cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=all_cupcakes)

@app.route('/api/cupcakes/<int:c_id>')
def list_specified_cupcake(c_id):
    cupcake = Cupcake.query.get_or_404(c_id)

    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes', methods=["POST"])
def add_cupcake():
    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = float(request.json["rating"])
    if request.json["image"] == '':
        new_image = None
    else:
        new_image = request.json["image"]
    
    new_cupcake = Cupcake(flavor=flavor, size=size,
                            rating=rating, image=new_image)

    db.session.add(new_cupcake)
    db.session.commit()
    response_json = jsonify(cupcake=new_cupcake.serialize())
    return (response_json, 201)
     
@app.route('/api/cupcakes/<int:c_id>', methods=['PATCH'])
def edit_cupcake(c_id):
    cupcake = Cupcake.query.get_or_404(c_id)
    cupcake.flavor = request.json.get("flavor", cupcake.flavor)
    cupcake.size = request.json.get("size", cupcake.size)
    cupcake.rating = float(request.json.get("rating", cupcake.rating))
    cupcake.image = request.json.get("image", cupcake.image)

    db.session.commit()
    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes/<int:c_id>', methods=['DELETE'])
def delete_cupcake(c_id):
    cupcake = Cupcake.query.get_or_404(c_id)
    db.session.delete(cupcake)
    db.session.commit()
    return jsonify(message="deleted")

  