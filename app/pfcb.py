from flask import Flask, render_template, url_for, request, session, redirect, flash
from flask.ext.pymongo import PyMongo
from flask.ext.login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from forms import LoginForm, SignupForm
from user import User
from json import dumps, loads
from werkzeug.wrappers import Response

app = Flask(__name__)
app.debug = True
with app.app_context():
    mongo = PyMongo(app)
    db = mongo.db
app.config["WTF_CSRF_ENABLED"] = True
app.config["SECRET_KEY"] = 'mongo_like_candy'
app.config["DB_NAME"] = 'pfcb'

app.config["CHARACTERS_COLLECTION"] = db.characters
app.config["SETTINGS_COLLECTION"] = db.settings
app.config["DEBUG"] = True
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


@login_manager.user_loader
def load_user(username):
    user = db.users.find_one({"username": username})
    if not user:
        return None
    return User(user['username'])


@app.route('/')
def index():
    user = get_current_user()
    if user and not isinstance(user, Response):
        return render_template('characters.html', characters=user['characters'])
    return render_template('index.html')

@app.route('/login', methods = ['GET', 'POST'])
def login():
    form = LoginForm()
    if request.method == 'POST' and form.validate_on_submit():
        user = db.users.find_one({"username": form.username.data})
        if user and User.validate_login(user['password'], form.password.data):
            user_obj = User(user['username'])
            login_user(user_obj)
            flash("Logged in successfully!", category = 'success')
            return redirect(request.args.get("next") or url_for("start_builder"))
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
            saved = users.insert({'username': form.username.data,
                                  'password': generate_password_hash(form.password.data),
                                  'characters': []})
            print(saved)
            if saved:
                flash("User " + form.username.data + " created successfully!", category = 'success')
            else:
                flash("User " + form.username.data + " could not be created!", category = 'error')
            return redirect(url_for('login'))
        flash('Username ' + request.form['username'] + ' already exists!', category = 'error')
    return render_template('signup.html', form = form)

@app.route('/licenses')
def licenses():
    return render_template('licenses.html', title="Licenses")


@app.route('/<collection_name>')
def show_collection(collection_name):
    if collection_in_db(collection_name):
        collection = db[collection_name]
        cursor = collection.find().sort('Name')
        return render_template('show_collection.html', cursor = cursor)
    return render_template('index.html')

@app.route('/<collection_name>/<document_name>')
def show_document(collection_name, document_name):
    if collection_in_db(collection_name):
        collection = db[collection_name]
        document = collection.find_one({"Name": document_name})
        if document:
            return render_template('show_document.html', html = document['Html'])
        else:
            flash("Could not find %s in %s!" % (document_name, collection_name), category = 'error')
    flash("Error! Could not find collection %s." % collection_name, category = 'error')
    return render_template('index.html')

@app.route('/character_builder')
@login_required
def start_builder():
    user = get_current_user()
    if user:
        return render_template('characters.html', characters = user['characters'])

# routes used by React app
@app.route('/get-user-characters')
@login_required
def characters():
    user = get_current_user()
    if type(user) is dict:
        return dumps(user['characters'])
    else:
        return user


@app.route('/get-base-classes')
@login_required
def get_base_classes():
    b_classes = {}
    for doc in db.classes.find(fields={"_id": False}):
        b_classes[doc["Name"]] = doc;
    return dumps(b_classes)

@app.route('/get-feats')
@login_required
def get_feats():
    feats = {}
    for doc in db.feats.find(fields={"_id": False}):
        feats[doc["Name"]] = doc;
    return dumps(feats)

@app.route('/get-skills')
@login_required
def get_skills():
    skills = {}
    for doc in db.skills.find(fields={"_id": False}):
        skills[doc["Name"]] = doc;
    return dumps(skills)

@app.route('/save-characters', methods=['PUT'])
@login_required
def save_character():
    user = get_current_user()
    data = request.get_json()
    if type(user) is dict:
        # attempt to save character data
        response = db.users.find_and_modify(
            {"username": user["username"]},
            {"$set": {"characters": data}},
            full_response = True,
            new=True
        )
        print(repr(response))
        if response["ok"] > 0:
            return dumps(response["value"]["characters"])
    else:
        return user


# helpers
def collection_in_db(collection_name):
    if collection_name not in db.collection_names() or collection_name in ["users", "system.info"]:
        flash("Could not view collection %s" % collection_name, category = 'error')
        return False
    return True

def get_current_user():
    if current_user.is_active:
        username = current_user.get_id()
        user = db.users.find_one({"username": username})
        if user: return user
        else:
            flash("User does not exist! You need to <a href='/signup'> signup</a>!", category='error')
            return redirect(url_for('signup'))
    else:
        return redirect(url_for('login'))




if __name__ == '__main__':
    app.run()

