from unittest import TestCase

from app import app
from models import db, Pet

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///test_pet_adoption_db'
app.config['SQLALCHEMY_ECHO'] = False

# Disables CSRF on WTForms
app.config['WTF_CSRF_ENABLED'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()

class PetAdoptionModelTestCase(TestCase):
    """Tests view functions."""   
    
    def setUp(self):
        """Clean up existing pets"""
        Pet.query.delete()
        test_pet = Pet(name='Boswald', species='dog', age=4, notes='v good dog', photo_url='https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/11160320/Bernese-Mountain-Dog-sitting-in-a-field.jpg')
        db.session.add(test_pet)
        db.session.commit()

        self.test_pet = test_pet


    def tearDown(self):
        """Clean up any fouled transaction"""
        Pet.query.delete()

    def test_home_list_pets(self):
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True) 

            self.assertEqual(res.status_code, 200) #reroute
            self.assertIn('<h1 class="display-1 text-center">Pets</h1>',html)
            self.assertIn('https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/11160320/Bernese-Mountain-Dog-sitting-in-a-field.jpg',html)
            self.assertIn('Boswald', html)
            self.assertIn('Boswald', html)
        

    def test_new_pet_form(self):
        with app.test_client() as client:
            res = client.get('/add')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1 class="display-1 text-center">New Pet</h1>', html)
            self.assertIn('Pet Name', html)

    def test_create_new_pet_form(self):
        with app.test_client() as client:
           d = {'name': 'billy', 'species': 'toucan', 'photo_url': 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/96276931/900', 'age': '7', 'notes': 'v cool toucan!'}
           res = client.post('/add', data=d, follow_redirects=True) 
           html = res.get_data(as_text=True)

           self.assertEqual(res.status_code, 200)
           self.assertIn('billy', html)
           self.assertIn('https://cdn.download.ams.birds.cornell.edu/api/v1/asset/96276931/900', html)

    def test_pet_details_page(self):
         with app.test_client() as client:
            res = client.get(f'/pets/{self.test_pet.id}')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('Boswald', html)

    def test_edit_pet_form(self):
        with app.test_client() as client:
           d = {'name': 'billy', 'species': 'toucan', 'photo_url': 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/96276931/900', 'age': '7', 'notes': 'v cool toucan!'}
           res = client.post(f'/pets/{self.test_pet.id}/edit', data=d, follow_redirects=True) 
           html = res.get_data(as_text=True)

           self.assertEqual(res.status_code, 200)
           self.assertIn('billy', html)
           self.assertIn('https://cdn.download.ams.birds.cornell.edu/api/v1/asset/96276931/900', html)

