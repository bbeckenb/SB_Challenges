"""Seed file to make sample data for pets db"""

from models import Pet, db
from app import app

#  Create all tables
db.drop_all()
db.create_all()

# If table is not empty, empty it
Pet.query.delete()

# add pets
whiskey = Pet(name='whiskey', species='dog')
bowser = Pet(name='bowser', species='dog', hunger=10)
spike = Pet(name='Spike', species='porcupine')

# Add new objects to session, so they'll persist
db.session.add(whiskey)
db.session.add(bowser)
db.session.add(spike)

# Commit-otherwise, staged items never get saved
db.session.commit()