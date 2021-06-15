from flask import Flask, render_template, request, redirect, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey, personality_quiz, surveys

app = Flask(__name__)
app.config['SECRET_KEY'] = 'oh-so-secret' #sessions?
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app) #only works when you use render

responses = []
q_position = 0

@app.route('/')
def survey_title_and_instruct():
    if len(responses) == len(satisfaction_survey.questions):
        redirect('/thanks')
    title = satisfaction_survey.title
    instructions = satisfaction_survey.instructions
    return render_template('home.html', instructions=instructions, title=title)

@app.route('/question/<int:index>') #need to specify data-type 'int: var name'
def post_question(index):
    if len(responses) == len(satisfaction_survey.questions):
        return redirect('/thanks')
    if index == 0 and len(responses) == 0:
        print('if',responses, index, len(responses))
        question = satisfaction_survey.questions[index]
        prompt = question.question
        choices = question.choices
        return render_template('question.html', prompt=prompt, choices=choices, index=0)

    elif index == len(responses) + 1:   
        print('elif',responses, index, len(responses))
        if request.args != []:
            responses.append(request.args)
            print(responses)

        if len(responses) != len(satisfaction_survey.questions):
            question = satisfaction_survey.questions[index]
            prompt = question.question
            choices = question.choices
            return render_template('question.html', prompt=prompt, choices=choices, index=len(responses))
        else:
            return redirect('/thanks')

    elif index != 0 and index == len(responses):
            question = satisfaction_survey.questions[index]
            prompt = question.question
            choices = question.choices
            flash('Please stop trying to change the questions', 'q-manip')
            return render_template('question.html', prompt=prompt, choices=choices, index=len(responses))
        

    else:
        print('else', responses, index, len(responses))
        index = len(responses)
        return redirect(f'/question/{index}')

@app.route('/thanks')
def thanks():
    return render_template('thankyou.html')
        