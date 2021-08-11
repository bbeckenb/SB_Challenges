"""Forms for our demo Flask app."""

from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SelectField
from wtforms.fields.html5 import EmailField, URLField
from wtforms.fields.simple import PasswordField
from wtforms.validators import InputRequired, Length, Optional #Email

class UserRegistrationForm(FlaskForm):
    """Form to allow new users to register"""
    username = StringField("Username", validators=[InputRequired(message="Username cannot be blank, max 20 characters"), Length(max=20)])
    password = PasswordField("Password", validators=[InputRequired(message="Password cannot be blank, max 20 characters")])
    email = EmailField("E-mail", validators=[InputRequired(message="E-mail cannot be blank")])
    first_name = StringField("First Name", validators=[InputRequired(message="Name cannot be blank, max 30 characters"), Length(max=30)])
    last_name = StringField("Last Name", validators=[InputRequired(message="Name cannot be blank, max 30 characters"), Length(max=30)])

class UserLoginForm(FlaskForm):
    """Form to allow current users to login"""
    username = StringField("Username", validators=[InputRequired(message="Username cannot be blank, max 20 characters"), Length(max=20)])
    password = PasswordField("Password", validators=[InputRequired(message="Password cannot be blank, max 20 characters")])
    
class FeedbackForm(FlaskForm):
    """Form to allow users to add feedback"""
    title = StringField("Title", validators=[InputRequired(message="Title cannot be blank, max 20 characters"), Length(max=50)])
    content = StringField("Content", validators=[InputRequired(message="Content cannot be blank, max 20 characters"), Length(max=160)])


# class AddSnackForm(FlaskForm):
#     """Form for adding snacks."""

#     name = StringField("Snack Name")
#     price = FloatField("Price in USD")
#     # quantity = FloatField("Amount of Snack")

# class EmployeeForm(FlaskForm):
#     name = StringField("Employee Name", validators=[
#                        InputRequired(message="Name cannot be blank")])
#     state = SelectField('State', choices=[(st, st) for st in states])
#     dept_code = SelectField("Department Code")