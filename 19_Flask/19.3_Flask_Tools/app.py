from flask import Flask, render_template, request, redirect, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from random import randint, choice, sample



app = Flask(__name__)
app.config['SECRET_KEY'] = 'oh-so-secret' #sessions?
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app) #only works when you use render

MOVIES = {'Jurassic Park', 'Aladdin', 'Weener Dog Movie'}

@app.route('/old-home-page')
def redirect_to_home():
    """redirect to new home"""
    return redirect('/') # use redirect

@app.route('/')
def home_page():
    return render_template('home.html')

@app.route('/movies')
def show_all_movies():
    """Show list of all movies in a fake DB"""
    return render_template('movies.html', movies=MOVIES)

@app.route('/movies/new', methods=['POST'])
def add_movie():
    title = request.form['title']
    if title in MOVIES:
        flash('Movie already in list!', 'error')
    else:
        flash('created your movie', 'success')
        flash('great choice!', 'success')
        MOVIES.add(title)
   # import pdb
   # pdb.set_trace() #like chrom developer tools debugger, setting a break point
    return redirect('/movies')

@app.route('/movies/json')
def get_movies_json():
    # return '{"Beans": {"year": 2015}}'
    return jsonify(list(MOVIES))

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




