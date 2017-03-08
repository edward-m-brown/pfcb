from flask.ext.wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, InputRequired, EqualTo


class LoginForm(FlaskForm):
    """Login form"""

    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])

class SignupForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), InputRequired(),
                                                   EqualTo('confirm', message = "Passwords must match")])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm = PasswordField('Confirm Password')