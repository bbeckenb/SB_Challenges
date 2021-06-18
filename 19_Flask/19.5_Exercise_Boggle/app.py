from boggle import Boggle
from flask import Flask, render_template, redirect, request, flash, session, jsonify

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'p???;.?vd?#???' # python -c 'import os; print(os.urandom(16))'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

# session['boggle_game'] = boggle_game

# def check_if_word_valid(word):
def initialize():
    new_board = boggle_game.make_board()
    session['session_game'] = new_board
    session['score'] = 0
    session['guesses'] = []
    

@app.route('/')
def welome_start_game():
    return render_template('welcome_start_game.html')

@app.route('/begin', methods=['POST'])
def new_game_in_session():
    initialize()
    return redirect('/boggle_guess')

@app.route('/guess/<guess>')
def handle_guess(guess):
    guesses = session['guesses']
    current_board = session.get('session_game', boggle_game.make_board())
    
    if guess in guesses:
        msg_out = 'repeat'
    else:
        msg_out = boggle_game.check_valid_word(current_board, guess)
    if msg_out == 'ok':
        session['score'] += len(guess)
        guesses.append(guess)
        session['guesses'] = guesses
    return_result = jsonify({'result' : msg_out, 'score' : session['score']})
    return return_result

@app.route('/update-data')
def update_score_timesplayed():
    score = session['score']
    times_played = session.get('times_played', 0)
    hi_score = session.get('highest_score', 0)
    if score > hi_score:
        session['highest_score'] = score
    times_played += 1
    session['times_played'] = times_played
    return_high_score_and_times_played = jsonify({'times_played' : session['times_played'], 'hi_score' : session['highest_score']})
    return return_high_score_and_times_played

@app.route('/boggle_guess')
def show_board_and_guess_form():
    session['session_game'] = session.get('session_game', boggle_game.make_board())
    session['times_played'] = session.get('times_played', 0)
    session['highest_score']= session.get('highest_score', 0)
    return render_template('view_board.html', board=session['session_game'], times_played=session['times_played'] , highest_score=session['highest_score'])



