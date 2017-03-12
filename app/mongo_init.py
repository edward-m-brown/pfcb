from pymongo import MongoClient
import os, sys, traceback
from datetime import datetime
from werkzeug.security import generate_password_hash
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import rules_scrapers


client = MongoClient()

db = client.pfcb

# Next, populate all the tables with scraped data
spells = db.spells
classes = db.classes
feats = db.feats
skills = db.skills
rules_collections = [(spells, rules_scrapers.core_spells), (classes, rules_scrapers.core_classes),
                    (feats, rules_scrapers.core_feats), (skills, rules_scrapers.core_skills)]
for collection in rules_collections:
    collection[0].remove() # clean old documents out
    for key in collection[1]:
        try: collection[0].insert(collection[1][key])
        except: traceback.print_exc()
# set up some initial users
users_collection = db.users
users = [
    {"username": "Loki", "password": generate_password_hash('fluffybunny101')},
    {"username": "Bartleby", "password": generate_password_hash('wingedcatdemons666')}
]
users_collection.remove() # clear out the old users
for user in users:
    users_collection.insert(user) # populate some dummy users


