from flask import Flask, render_template, request, redirect, flash, jsonify, session
from surveys import satisfaction_survey, personality_quiz, surveys

app = Flask(__name__)
app.config['SECRET_KEY'] = 'oh-so-secret' #sessions?
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
# debug = DebugToolbarExtension(app) #only works when you use render

@app.route('/')
def survey_title_and_instruct():
    title = satisfaction_survey.title
    instructions = satisfaction_survey.instructions
    return render_template('home.html', instructions=instructions, title=title)

@app.route('/', methods=['POST'])
def survey_start_session():
    session['responses'] = []
    print('We made it here')
    return redirect('/question/0')

@app.route('/question/<int:index>') #need to specify data-type 'int: var name'
def post_question(index):
    responses = session['responses']
    if len(responses) == len(satisfaction_survey.questions):
        return redirect('/thanks')
    
    question = satisfaction_survey.questions[index]
    prompt = question.question
    choices = question.choices

    if index == 0 and len(responses) == 0:
        print('if',responses, index, len(responses))
        return render_template('question.html', prompt=prompt, choices=choices, index=0)

    elif index == len(responses) + 1:   
        print('elif',responses, index, len(responses))
        if request.args != []:
            responses.append(request.args['answer'])
            session['responses'] = responses
            print(responses)

        if len(responses) != len(satisfaction_survey.questions):
            
            return render_template('question.html', prompt=prompt, choices=choices, index=len(responses))
        else:
            return redirect('/thanks')

    elif index != 0 and index == len(responses):
            flash('Please stop trying to change the questions', 'q-manip')
            return render_template('question.html', prompt=prompt, choices=choices, index=len(responses))
        
    else:
        print('else', responses, index, len(responses))
        index = len(responses)
        return redirect(f'/question/{index}')

@app.route('/thanks')
def thanks():
    return render_template('thankyou.html')
        