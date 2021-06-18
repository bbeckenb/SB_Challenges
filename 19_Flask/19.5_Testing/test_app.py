from app import app, session
from unittest import TestCase

app.config['TESTING'] = True #Enables testing mode, instead of HTML errors we'll get real python errors

app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar'] #stops flask debug toolbar from propogating/interfering

#small projects, we put everything in one file
#if larger app, we need to test parts in different file
#if we have all test files start with 'test_', they can be tested in parallel
# when python3 -m unittest is called

class AppRunTestCase(TestCase):
    def setUp(self):
        """stuff to do before every test"""
        """All tests below will run in order setUp, test_x, tearDown"""

    def tearDown(self):
        """stuff to do after each test"""
    
    #separate your functions/logic from view functions

    def test_hello(self): #get request test
        with app.test_client() as client: #pretends to be the host
           res = client.get('/hello') #gets html GET request
           html = res.get_data(as_text=True) #converts to text

           self.assertEqual(res.status_code, 200)
           self.assertIn('<h1>Hello!</h1>', html)

    def test_add_comment_form(self): #post request test
        with app.test_client() as client:
            res = client.post('/add-comment', data={'comment': 'hi', 'username': 'bob'})
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<li>Comment: hi</li>', html)

    def test_redirection(self):
        with app.test_client() as client:
            res = client.get("/my/route")

            self.assertEqual(res.status_code, 302)
            self.assertEqual(res.location, 'http://localhost/lucky')
# test redirects
    def test_redirection_followed(self):
        with app.test_client() as client:
            res = client.get('/my/route', follow_redirects=True)
            html = res.get_data(as_text=True)
            
            self.assertEqual(res.status_code, 200)
            self.assertIn('<h2>LUCKY NUMBER TIME</h2>', html)

    # testing sessions
    def test_session_count(self):
        with app.test_client() as client:   
            res = client.get('/')

            self.assertEqual(res.status_code, 200)
            self.assertEqual(session["count"], 1)

    def test_session_count_set(self):
        with app.test_client() as client:  
            with client.session_transaction() as change_session: 
                change_session['count'] = 999
            
            res = client.get('/')

            self.assertEqual(res.status_code, 200)
            self.assertEqual(session["count"], 1000)