from flask import Flask, request, render_template #do this everytime we need flask
from flask_debugtoolbar import DebugToolbarExtension
from random import randint, choice, sample

app = Flask(__name__) #Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 #if this file where server is being hosted from is named something different
 #we type FLASK_APP=file_name.py flask run
 #command line: FLASK_ENV=development flask run if we want dev mode
#command line: export FLASK_ENV=development, so we don't have to type the above everytime
#putting the above in bash profile
app.config['SECRET_KEY'] = 'oh-so-secret' #sessions?
debug = DebugToolbarExtension(app) #only works when you use render

@app.route('/')
def home_page():
    return render_template('home.html')

@app.route('/lucky')
def lucky_number():
    num = randint(1,3)
    msg = 'you are verrry very lucky'
    return render_template('lucky.html', lucky_num=num, msg=msg)

@app.route('/spell/<word>')
def spell_word(word):
    word = word.upper()
    return render_template('spell_word.html', word=word)

@app.route('/form')
def show_form():
    return render_template('form.html')

@app.route('/form-2')
def show_form_2():
    return render_template('form_2.html')


COMPLIMENTS = ['super', 'neat', 'lovely', 'cat-like', 'squirmy', 'revered']
@app.route('/greet')
def get_greeting():
    name = request.args["username"]
    return render_template('greet.html', name=name, compliments=choice(COMPLIMENTS))

@app.route('/greet-2')
def get_greeting_2():
    name = request.args["username"]
    wants_compliments = request.args.get('wants_compliments')
    nice_things = sample(COMPLIMENTS, 3)
    return render_template('greet_2.html', username=name, wants_compliments=wants_compliments, compliments=nice_things)


@app.route('/hello') #type this at the end of url to make function run
def say_hello():
    # html =  """
    # <html>
    #     <body>
    #         <h1>Hello!</h1>
    #         <p>This is the hello page<p>
    #     </body>
    # </html>
    # """
    # return html
    return render_template('hello.html')

# @app.route('/goodbye')
# def say_bye():
#     return "GOOD BYE!!!"

@app.route('/search')
def search():
    term = request.args["term"] #extract data from query string
    sort = request.args["sort"]
    print(request.args)
    # use term to find db data that matches term

    return f"<h1>Search Results For: {term}</h1> <p>Sorting by : {sort}</p>"

@app.route("/my/route", methods=['POST'])
def post_demo():
    return "You made a post request"

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

@app.route('/r/<subreddit>')
def show_subreddit(subreddit):
    return f"<h1>Browsing {subreddit} Subreddit</h1>"

@app.route("/r/<subreddit>/comment/<int:post_id>")
def show_comments(subreddit, post_id):
    return f"<h1>Viewing comments for post with id: {post_id} from the {subreddit} Subreddit</h1>"

POSTS = {
    1: "I like chickens",
    2: "beep boop",
    3: "wowwww"
}

@app.route('/post/<int:id>') #need to specify data-type 'int: var name'
def find_post(id):
    post = POSTS.get(id, "Post Not Found")
    return f"<p>{post}</p>"

# URL Parameter /shop/<toy> is like subject of page
# Query Parameter /shop?toy=elmo is like extra infor about page, often used when coming from form
