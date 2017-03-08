from flask import Flask, render_template, url_for, request, session, redirect, flash
from flask.ext.pymongo import PyMongo
from flask.ext.login import LoginManager, login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from forms import LoginForm, SignupForm
from user import User

app = Flask(__name__)
app.debug = True
with app.app_context():
    mongo = PyMongo(app)
    db = mongo.db
app.config["WTF_CSRF_ENABLED"] = True
app.config["SECRET_KEY"] = 'harriet_the_spy'
app.config["DB_NAME"] = 'pfcb'
app.config["DATABASE"] = db
app.config["SPELLS_COLLECTION"] = db.spells
app.config["CLASSES_COLLECTION"] = db.classes
app.config["SKILLS_COLLECTION"] = db.skills
app.config["FEATS_COLLECTION"] = db.feats
app.config["USERS_COLLECTION"] = db.users
app.config["CHARACTERS_COLLECTION"] = db.characters
app.config["SETTINGS_COLLECTION"] = db.settings
app.config["DEBUG"] = True
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


@login_manager.user_loader
def load_user(username):
    user = app.config['USERS_COLLECTION'].find_one({"username": username})
    if not user:
        return None
    return User(user['username'])


@app.route('/')
def index():
    """
    html = "<html><ul>"
    for name in db.collection_names():
        if name != "system.indexes":
            html += "<li> <a href='/" + name + "'> " + name + "</a></li>"
    html += "</ul></html>"
    """
    # return html
    return render_template('index.html')

@app.route('/login', methods = ['GET', 'POST'])
def login():
    form = LoginForm()
    if request.method == 'POST' and form.validate_on_submit():
        user = app.config["USERS_COLLECTION"].find_one({"username": form.username.data})
        print(form.username.data)
        if user and User.validate_login(user['password'], form.password.data):
            user_obj = User(user['username'])
            login_user(user_obj)
            flash("Logged in successfully!", category = 'success')
            return redirect(request.args.get("next") or url_for("write"))
        flash("Wrong username or password! Do you need to <a href='/signup'>Create an account</a>?", category = 'error')
    return render_template('login.html', title = 'login', form = form)


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('login'))


@app.route('/signup', methods = ['POST', 'GET'])
def signup():
    form = SignupForm()
    if request.method == 'POST' and form.validate_on_submit():
        users = db.users
        extant = users.find_one({"username": form.username.data})
        if extant is None:
            pass_hash = generate_password_hash(request.form['pass'])
            users.insert({'name': request.form['username'], 'password': pass_hash})
            session['username'] = request.form['username']
            return redirect(url_for('index'))
        return 'Username ' + request.form['username'] + ' already exists!'
    return render_template('signup.html')
    return "Not Yet Implemented"

@app.route('/write')
def write():
    return render_template('write.html')

@app.route('/<collection_name>')
def show_collection(collection_name):
    collection = db[collection_name]
    cursor = collection.find()
    html = "<html><ul>"
    for item in cursor:
        html += "<li><a href='/{col_name}/{item_name}'>{item_name}</a></li>"\
            .format(col_name = collection_name, item_name = item["Name"])
    html += "</ul></html>"
    return html

if __name__ == '__main__':
    app.run()

