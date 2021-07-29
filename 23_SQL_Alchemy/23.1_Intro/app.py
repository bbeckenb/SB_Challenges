'''

Use python objects from some class pattern so we do not have to write SQL
SQL Alchemy allows us to cleanly link DB to end-points
ORM (Object Relational Mapper)

Get Started at cmd line:
python3 -m venv venv
source venv/bin/activate
pip3 install flask
pip3 install psycopg2-binary (THIS DOES NOT GO IN CMD LINE: for postGres)
pip3 install flask-sqlalchemy

'model' is an object that represents the database
MODEL - create a python class that represents our database (Object Relational Mapping)
Need to define a model

When testing, make a test database
-Set up db.query.delete()
-Tear down db.session.rollback()
-Test models, methods
-Test routes

'''

from flask import Flask, redirect, render_template, request, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy
from models import db, connect_db, Pet

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_shop_db' #connects to actual database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False #removes warning and overhead
app.config['SQLALCHEMY_ECHO'] = True #helps us see what SQL calls are being made
connect_db(app)
# The below lines are in model.py now, called with connect_db()
# db = SQLAlchemy()
# db.app = app #pass reference of our app to sqlAlchemy
# db.init_app(app) #initializes app

app.config['SECRET_KEY'] = '\x00\x8b?$\xe1\x87\xd07\x9c\x17>H\xc1\xb4rxF\\\x90\xd9\x132\x1b\xa6\xb9\x0c\xe0\xf7\xe5\x99\x100' #python3 -c 'import os; print(os.urandom(32))' 
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

@app.route('/')
def list_pets():
    """shows list of pets in db"""
    pets = Pet.query.all()
    return render_template('list.html', pets=pets)

@app.route('/', methods=["POST"])
def create_pet():
    name = request.form["name"]
    species = request.form["species"]
    hunger = request.form["hunger"]
    hunger = int(hunger) if hunger else None

    new_pet = Pet(name=name, species=species, hunger=hunger)
    db.session.add(new_pet)
    db.session.commit()
    return redirect(f'/{new_pet.id}')

@app.route('/<int:pet_id>')
def show_pet(pet_id):
    """show details about a single pet"""
    pet = Pet.query.get_or_404(pet_id)
    return render_template("details.html", pet=pet)

@app.route("/species/<species_id>")
def show_pets_by_species(species_id):
    pets = Pet.get_by_species(species_id)
    return render_template("species.html", pets=pets, species=species_id)

