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
    return render_template('index.html')

@app.route('/login', methods = ['GET', 'POST'])
def login():
    form = LoginForm()
    if request.method == 'POST' and form.validate_on_submit():
        user = app.config["USERS_COLLECTION"].find_one({"username": form.username.data})
        if user and User.validate_login(user['password'], form.password.data):
            user_obj = User(user['username'])
            login_user(user_obj)
            flash("Logged in successfully!", category = 'success')
            return redirect(request.args.get("next") or url_for("index"))
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
            saved = users.insert({'username': form.username.data, 'password': generate_password_hash(form.password.data)})
            print(saved)
            if saved:
                flash("User " + form.username.data + " created successfully!", category = 'success')
            else:
                flash("User " + form.username.data + " could not be created!", category = 'error')
            return redirect(url_for('login'))
        flash('Username ' + request.form['username'] + ' already exists!')
    return render_template('signup.html', form = form)


@app.route('/<collection_name>')
def show_collection(collection_name):
    if collection_in_db(collection_name):
        collection = db[collection_name]
        cursor = collection.find().sort('Name')
        return render_template('show_collection.html', cursor = cursor)
    return render_template('index.html')


@app.route('/characters')
@login_required
def show_characters():
    return render_template('characters.html')


@app.route('/<collection_name>/<document_name>')
def show_document(collection_name, document_name):
    if collection_in_db(collection_name):
        collection = db[collection_name]
        cursor = collection.find({"Name": document_name})
        if cursor.count() == 1:
            return render_template('show_document.html', document = cursor[0])
        elif cursor.count() == 0:
            flash("Could not find %s in %s!" % (document_name, collection_name), category = 'error')
        else:
            flash("More than one document with name %s in %s!" % (document_name, collection_name), category = 'error')
    return render_template('index.html')


# helpers
def collection_in_db(collection_name):
    if collection_name not in db.collection_names() or collection_name in ["users", "system.info"]:
        flash("Could not view collection %s" % collection_name, category = 'error')
        return False
    return True


if __name__ == '__main__':
    app.run()

