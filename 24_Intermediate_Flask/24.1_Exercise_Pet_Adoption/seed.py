"""Seed file to make sample data for db."""
# EXAMPLE SETUP
from models import Pet, db
from app import app

# Create all tables
db.drop_all()
db.create_all()

Pet.query.delete()

panther = Pet(name='Bageera', species='panther', age=3, notes='v cute, v nice kitty', available=False, photo_url='https://cdn.britannica.com/78/186778-050-73CF4F25/black-panther-leopards-Africa-Central-jaguars-South.jpg')
dog = Pet(name='Boswald', species='dog', age=4, notes='v good dog', photo_url='https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/11160320/Bernese-Mountain-Dog-sitting-in-a-field.jpg')
fish = Pet(name='Pineapple', species='fish', age=97, notes='v good to pet', photo_url='https://thumbs-prod.si-cdn.com/7UodV-s6j5aEVfrYwg5KQ26oBLY=/fit-in/1600x0/https://public-media.si-cdn.com/filer/d6/93/d6939718-4e41-44a8-a8f3-d13648d2bcd0/c3npbx.jpg')

db.session.add_all([panther, dog, fish])
db.session.commit()
