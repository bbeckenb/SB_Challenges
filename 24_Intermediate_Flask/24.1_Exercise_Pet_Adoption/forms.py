"""Forms for our demo Flask app."""

from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SelectField, IntegerField
from wtforms.fields.html5 import URLField
from wtforms.validators import AnyOf, InputRequired, NumberRange, Optional, URL #Email

# EXAMPLES

class PetForm(FlaskForm):
    """Form for adding/ editing pets."""

    name = StringField("Pet Name", validators=[InputRequired(message='Name cannot be blank!')])
    species = StringField("Pet Type", validators=[InputRequired(message='Species cannot be blank!'), AnyOf(['dog', 'monkey', 'panther', 'fish', 'cat', 'gecko', 'toucan', 'cat'], message="must be on the limited list of allowed pets: 'dog', 'monkey', 'panther', 'fish', 'cat', 'gecko', 'toucan', 'cat'")])
    photo_url = URLField("Pet Photo URL", validators=[URL(require_tld=True, message='Please enter a valid URL for your pet photo!')])
    age = IntegerField("Age", validators=[NumberRange(min=0, max=100, message='Please enter an age between 0 and 100!')])
    notes = StringField("Pet Notes!")


# class EmployeeForm(FlaskForm):
#     name = StringField("Employee Name", validators=[
#                        InputRequired(message="Name cannot be blank")])
#     state = SelectField('State', choices=[(st, st) for st in states])
#     dept_code = SelectField("Department Code")