from flask import Flask
from flask.ext.pymongo import PyMongo

app = Flask(__name__)
app.debug = True
with app.app_context():
    mongo = PyMongo(app)
    db = mongo.db

@app.route('/')
def home_page():
    html = "<html><ul>"
    for name in db.collection_names():
        if name != "system.indexes":
            html += "<li> <a href='/" + name + "'> " + name + "</a></li>"
    html += "</ul></html>"
    return html

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