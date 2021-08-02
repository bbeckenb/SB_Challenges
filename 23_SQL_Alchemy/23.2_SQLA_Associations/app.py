from flask import Flask, redirect, render_template, request, flash, session
from flask_sqlalchemy import SQLAlchemy
from models import db, connect_db, Department, Employee, get_directory

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///employees_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = '?\xe6h\x01\xa6\x8bK\xce'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
# debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def reroute():
    return redirect('/phones')

@app.route('/phones')
def list_phones():
    emps = Employee.query.all()
    return render_template('phone.html', emps=emps)

