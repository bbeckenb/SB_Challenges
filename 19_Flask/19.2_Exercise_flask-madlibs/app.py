from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from stories import story

app = Flask(__name__) #Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 #if this file where server is being hosted from is named something different
 #we type FLASK_APP=file_name.py flask run
 #command line: FLASK_ENV=development flask run if we want dev mode
#command line: export FLASK_ENV=development, so we don't have to type the above everytime
#putting the above in bash profile
app.config['SECRET_KEY'] = 'oh-so-secret' #sessions?
debug = DebugToolbarExtension(app) #only works when you use render

@app.route('/')
def word_input():
    word_request = story.prompts
    return render_template('home.html', word_request=word_request)

@app.route('/story-display')
def story_display():
    prompt_result_dict = {}  
    # story_out = request.form
    # print(request.form) 
    for prompt in story.prompts:
        prompt_result_dict[prompt] = request.args[prompt]

    story_out = story.generate(prompt_result_dict)
    return render_template('story-display.html', story_out=story_out)

