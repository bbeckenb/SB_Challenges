from flask import Flask, render_template, request, redirect, flash, jsonify, session
from random import randint, choice, sample



app = Flask(__name__)
app.config['SECRET_KEY'] = 'oh-so-secret' #sessions?
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False


@app.route('/')
def index():
    """Show Homepage"""
    session["count"] = session.get('count', 0) + 1
    return render_template('lucky.html')



@app.route('/lucky')
def lucky_number():
    num = randint(1,3)
    msg = 'you are verrry very lucky'
    return render_template('lucky.html', lucky_num=num, msg=msg)



@app.route('/hello') #type this at the end of url to make function run
def say_hello():
    html =  """
    <html>
        <body>
            <h1>Hello!</h1>
            <p>This is the hello page<p>
        </body>
    </html>
    """
    return html
    # return render_template('hello.html')

# @app.route('/goodbye')
# def say_bye():
#     return "GOOD BYE!!!"


@app.route("/my/route")
def post_demo():
    return redirect('/lucky')

@app.route('/add-comment')
def add_comment_form():
    return """
    <h1>Add comment</h1> #getting data from forms
    <form method="POST">
        <input type='text' placeholder='comment' name='comment'/>
        <input type='text' placeholder='username' name='username'/>
        <button>Submit</button>
    </form>
    """

@app.route('/add-comment', methods=["POST"]) #post method w/vars
def save_comment():
    comment_text = request.form["comment"]
    username = request.form["username"]
    print(request.form)
    return f"""
    <h1>SAVED YOUR COMMENT</H1>
    <ul>
        <li>Username: {username}</li>
        <li>Comment: {comment_text}</li>
    </ul>
    """
