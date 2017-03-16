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
    "Name": "Loki",
    "Description" : {
        "Alignment": "Lawful Neutral",
        "Deity": "Loki",
        "Race": "Human", # replace with db.races.find({"Name": "Elf"}) when races are a thing
        "Size": "Medium",
        "Gender": "Male",
        "Age": 2000,
        "Height": "5'9\"",
        "Weight": "200lbs.",
        "Hair": "bald",
        "Eyes": "blue"
     },
    "Levels": {
        "Exp": 0, # maybe should make levels tied to exp amount?
        "Class_Levels": [{"Fighter": 1}] # class_name : level pair will allow querying in flask to send data to react?
    },
    "Ability_Scores": {
        "STR": 10,
        "DEX": 10,
        "CON": 10,
        "INT": 10,
        "WIS": 10,
        "CHA": 10
    },
    "Movement": {
        "Base": 30,
        "Fly": 60,
        "Swim": 15,
        "Climb": 15,
        "Burrow": 0
    },
    "Feats": [],
    "Special_Abilities" : { # should probably be derived inside React app.
        "Abilities": [], # should be derived from Class_Levels. Will be a number of JSON/dicts,
        "Class_Features": []
    },
    "Spells": {
        "Known": {
        },
        "Prepared": {
        }
    }
}

users_collection.update({"username": "Loki"}, {"$push": {"characters": loki_char}})



