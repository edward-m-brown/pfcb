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
    'Status': {
        'HP': 0,
        'Temp': 0,
        'Current': 0,
        'Nonlethal': 0,
        'DR': {},
        'Effects': {}
    },
    'Levels': {
        'Exp': 0,
        'Class_Levels': {'Fighter': 1},
        'Character_Level': 1
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
        # temporary adjustments should be stored, in case they persist between game sessions
        'temp': {
            'STR': 0,
            'DEX': 0,
            'CON': 0,
            'INT': 0,
            'WIS': 0,
            'CHA': 0
        },
        # racial bonuses/minuses
        'racial': {
            'STR': 0,
            'DEX': 0,
            'CON': 0,
            'INT': 0,
            'WIS': 0,
            'CHA': 0
        }
    },
    'Movement': {
        'Base Speed': 30,
        'With Armor': 30,
        'Fly': 60,
        'Swim': 15,
        'Climb': 15,
        'Burrow': 0
    },
    'BAB': 0,
    'Initiative Modifier': 0,
    'Feats': [],
    'Abilities': [],
    'Class_Features': [],
    'Spells': {
        'Known': {
        },
        'Prepared': {
        }
    },
    'Skills': {
        'Total_Ranks': 0,
        'Skill_Table': {
            'Acrobatics' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Appraise' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Bluff' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Climb' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Craft' : {
                'alchemy': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'armor': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'bows': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'poison': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'weapons': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'traps':{
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                }
            },
            'Diplomacy' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Disable Device' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Disguise' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Escape Artist' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Fly' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Handle Animal' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Heal' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Intimidate' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Knowledge' : {
                'arcana' : {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'dungeoneering' : {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'engineering' : {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'geography' : {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'history' : {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'local' : {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'nature' : {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'nobility' : {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'planes' : {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'religion' :{
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                }
            },
            'Linguistics' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Perception' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Perform' : {
                'act': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'comedy': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'dance': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'keyboard instruments': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'oratory': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'perscussion instruments': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'string instruments': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'wind instruments': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'sing':{
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                }
            },
            'Profession' : {
                'architect': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'baker': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'barrister': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'brewer': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'butcher': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'clerk': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'cook': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'courtesan': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'driver': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'engineer': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'farmer': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'fisherman': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'gambler': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'gardener': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'herbalist': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'innkeeper': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'librarian': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'merchant': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'midwife': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'miller': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'miner': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'porter': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'sailor': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'scribe': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'shepherd': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'stable master': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'master': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'soldier': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'tanner': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'trapper': {
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                },
                'woodcutter':{
                    'ranks': 0,
                    'class': False,
                    'bonuses': {}
                }
            },
            'Ride' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Sense Motive' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Sleight of Hand' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Spellcraft' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Stealth' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Survival' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Swim' : {
                'ranks': 0,
                'class': False,
                'bonuses': {}
            },
            'Use Magic Device' :{
                'ranks': 0,
                'class': False,
                'bonuses': {}
            }
        }
    }
}

users_collection.update({"username": "Loki"}, {"$push": {"characters": loki_char}})





































