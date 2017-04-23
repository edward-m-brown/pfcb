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
    'Race': {

    },
    'Size': {

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
    'Defense' : {
            'AC': {
                'Armor Bonus': 0,
                'Shield Bonus': 0,
                'Natural Armor': 0,
                'Deflection Modifier': 0,
                'Dodge Bonus': 0,
                'Misc Modifier': 0,
                'Mod Notes': ''
            },
            'AC_include': {
                'strMod': False,
                'conMod': False,
                'intMod': False,
                'wisMod': False,
                'chaMod': False

            },
            'Touch_exclude': {
                'Armor Bonus': True,
                'Shield Bonus': True,
                'Natural Armor': True,
            },
            'Flat-footed_exclude': {
                'DEX Modifier': True,
                'Dodge Bonus': True
            },
            'Saves': {
                'Fortitude': {
                    'Base Save': 0,
                    'Magic Modifier': 0,
                    'Misc Modifier': 0,
                    'Temporary Modifier': 0
                },
                'Reflex': {
                    'Base Save': 0,
                    'Magic Modifier': 0,
                    'Misc Modifier': 0,
                    'Temporary Modifier': 0
                },
                'Will': {
                    'Base Save': 0,
                    'Magic Modifier': 0,
                    'Misc Modifier': 0,
                    'Temporary Modifier': 0
                },
                'Modifiers': ''
            },
            'Spell Resistance': 0
        },
    'Offense': {
        'BAB': 0,
        'Initiative Modifier': 0,
        'CMB Modifiers': ''
    },
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
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Appraise' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Bluff' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Climb' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Craft' : {
                'alchemy': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'armor': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'bows': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'poison': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'weapons': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'traps':{
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                }
            },
            'Diplomacy' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Disable Device' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Disguise' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Escape Artist' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Fly' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Handle Animal' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Heal' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Intimidate' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Knowledge' : {
                'arcana' : {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'dungeoneering' : {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'engineering' : {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'geography' : {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'history' : {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'local' : {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'nature' : {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'nobility' : {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'planes' : {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'religion' :{
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                }
            },
            'Linguistics' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Perception' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Perform' : {
                'act': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'comedy': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'dance': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'keyboard instruments': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'oratory': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'perscussion instruments': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'string instruments': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'wind instruments': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'sing':{
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                }
            },
            'Profession' : {
                'architect': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'baker': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'barrister': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'brewer': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'butcher': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'clerk': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'cook': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'courtesan': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'driver': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'engineer': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'farmer': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'fisherman': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'gambler': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'gardener': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'herbalist': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'innkeeper': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'librarian': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'merchant': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'midwife': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'miller': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'miner': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'porter': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'sailor': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'scribe': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'shepherd': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'stable master': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'master': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'soldier': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'tanner': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'trapper': {
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                },
                'woodcutter':{
                    'Ranks': 0,
                    'class': False,
                    'Misc Mod': 0
                }
            },
            'Ride' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Sense Motive' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Sleight of Hand' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Spellcraft' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Stealth' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Survival' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Swim' : {
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            },
            'Use Magic Device' :{
                'Ranks': 0,
                'class': False,
                'Misc Mod': 0
            }
        }
    }
}

users_collection.update({"username": "Loki"}, {"$push": {"characters": loki_char}})





































