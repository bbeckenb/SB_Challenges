from re import A
from unittest import TestCase
from app import app, initialize, session, handle_guess
from flask import session
from boggle import Boggle

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

class FlaskTests(TestCase):
    # def setUp(self):
        
    # def tearDown(self):

    def test_welcome_start(self):
        """Want this to:
        -Render 'welcome_start_game.html'
        """
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1>Welcome to Boggle!</h1>', html)
    
    def test_begin(self):
        """Want this to:
        -Run initialize() function
        -Redirect to '/boggle_guess' 
        """
        with app.test_client() as client:
            res = client.post('/begin')
    
        self.assertEqual(res.status_code, 302)
        #self.assertEqual(session['score'], 0) #why won't this work?

    def test_begin_redirection(self):
         with app.test_client() as client:
            res = client.post('/begin', follow_redirects=True)
            html = res.get_data(as_text=True)
            
            self.assertEqual(res.status_code, 200)
            self.assertIn('<h3 id="times-played">Times Played: 0</h3>', html)

    def test_boggle_guess(self):
        with app.test_client() as client:
            res = client.get('/boggle_guess')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertEqual(session['times_played'], 0)
            self.assertEqual(session['highest_score'], 0)
            self.assertIn('<h3 id="hi-score">Highest Score: 0</h3>', html)

    def test_guess_handler(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session: 
                change_session['guesses'] = ['cat']
                change_session['score'] = 3
        
            res = client.get('/guess/tree') 

            self.assertEqual(res.status_code, 200)
            self.assertEqual(session['guesses'], ['cat', 'tree'])
            self.assertEqual(session['score'], 7)
            
    def test_update_data(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session: 
                change_session['highest_score'] = 1
                change_session['score'] = 3
                change_session['times_played'] = 6
            
            res = client.get('/update-data')
            

            self.assertEqual(session['times_played'], 7)
            self.assertEqual(session['highest_score'], 3)

