"""Forms for our demo Flask app."""

from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SelectField
from wtforms.fields.html5 import URLField
from wtforms.validators import InputRequired, Optional #Email

class AddCupcakeForm(FlaskForm):
    """Form for adding cupcakes."""

    flavor = StringField("Cupcake Flavor", validators=[
                        InputRequired(message="Flavor cannot be blank")])
    size = StringField("Size", validators=[
                        InputRequired(message="Size cannot be blank")])
    rating = FloatField("Rating", validators=[
                        InputRequired(message="Rating cannot be blank")])
    image = URLField("Image URL")
