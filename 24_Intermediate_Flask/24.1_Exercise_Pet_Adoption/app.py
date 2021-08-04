"""Blogly application."""

from flask import Flask, redirect, render_template, request, flash, session
# from flask_debugtoolbar import DebugToolbarExtension
from forms import PetForm
from models import db, connect_db, Pet

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_adoption_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

app.config['SECRET_KEY'] = '?\xe6h\x01\xa6\x8bK\xce' #python3 import random, random.randbytes(n)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
# debug = DebugToolbarExtension(app)

#Example View Functions
@app.route('/')
def list_all_pets():
    pets = Pet.query.all()
    return render_template('list_pets_home.html', pets=pets)

@app.route('/add', methods=["GET", "POST"])
def add_pet():
    form = PetForm()
    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data

        new_pet = Pet(name=name, species=species, photo_url=photo_url, age=age, notes=notes)
        db.session.add(new_pet)
        db.session.commit()
        return redirect('/')
    else:
        return render_template('add_pet_form.html', form=form)

@app.route('/pets/<int:pet_id>')
def view_pet_details(pet_id):
    pet = Pet.query.get(pet_id)

    return render_template('view_pet_details.html', pet=pet)

@app.route('/pets/<int:pet_id>/edit', methods=['GET', 'POST'])
def edit_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    form = PetForm(obj=pet)
    if form.validate_on_submit():
        pet.name = form.name.data
        pet.species = form.species.data
        pet.photo_url = form.photo_url.data
        pet.age = form.age.data
        pet.notes = form.notes.data

        db.session.commit()
        return redirect('/')
    else:
        return render_template('edit_pet_form.html', pet=pet, form=form)
