from pymongo import MongoClient
from pymongo.collection import Collection
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
    {"username": "Loki", "password": generate_password_hash('bunny101'), "characters": []},
    {"username": "Bartleby", "password": generate_password_hash('demons666'), "characters": []}
]
users_collection.remove() # clear out the old users
for user in users:
    users_collection.insert(user) # populate some dummy users

loki_char = {
    'Name': 'Loki',
    'Description' : {
        'Alignment': 'Lawful Neutral',
        'Deity': 'Loki',
        'Race': 'Human',
        'Size': 'Medium',
        'Gender': 'Male',
        'Age': 2000,
        'Height': '5ft. 9in.',
        'Weight': '200lbs.',
        'Hair': 'bald',
        'Eyes': 'blue'
     },
    'Levels': {
        'Exp': 0,
        'Class_Levels': {'Fighter': 1}
    },
    'Ability_Scores': {
        'base': {
            'STR': 10,
            'DEX': 10,
            'CON': 10,
            'INT': 10,
            'WIS': 10,
            'CHA': 10
        },
        'temp': {
            'STR': 0,
            'DEX': 0,
            'CON': 0,
            'INT': 0,
            'WIS': 0,
            'CHA': 0
        }
    },
    'Movement': {
        'Base': 30,
        'Fly': 60,
        'Swim': 15,
        'Climb': 15,
        'Burrow': 0
    },
    'Feats': [],
    'Special_Features' : {
        'Abilities': [],
        'Class_Features': []
    },
    'Spells': {
        'Known': {
        },
        'Prepared': {
        }
    }
}

users_collection.update({"username": "Loki"}, {"$push": {"characters": loki_char}})



