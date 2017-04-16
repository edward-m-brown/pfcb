const character_template = {
    'Name': 'Unknown Hero',
    'Description' : {
        'Alignment': null,
        'Deity': 'N/A',
        'Race': null,
        'Size': null,
        'Gender': null,
        'Age': 0,
        'Height': '',
        'Weight': '',
        'Hair': '',
        'Eyes': ''
    },
    'Levels': {
        'Exp': 0,
        'Class_Levels': {}
    },
    'Ability_Scores': {
        'base': {
            'STR': 8,
            'DEX': 8,
            'CON': 8,
            'INT': 8,
            'WIS': 8,
            'CHA': 8
        },
        'temp': {
            'STR': 0,
            'DEX': 0,
            'CON': 0,
            'INT': 0,
            'WIS': 0,
            'CHA': 0
        },
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
        'Fly': 0,
        'Swim': 15,
        'Climb': 15,
        'Burrow': 0,
        'Temp Modifiers': ''
    },
    'BAB': 0,
    'Feats': [],
    'Abilities': [],
    'Class_Features': [],
    'Skills': {
        'Total_Ranks': 0,
        'Skill_Table': {
            'Acrobatics' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Appraise' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Bluff' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Climb' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Craft' : {
                'alchemy': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'armor': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'bows': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'poison': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'weapons': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'traps':{
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                }
            },
            'Diplomacy' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Disable Device' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Disguise' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Escape Artist' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Fly' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Handle Animal' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Heal' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Intimidate' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Knowledge' : {
                'arcana' : {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'dungeoneering' : {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'engineering' : {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'geography' : {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'history' : {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'local' : {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'nature' : {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'nobility' : {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'planes' : {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'religion' :{
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                }
            },
            'Linguistics' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Perception' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Perform' : {
                'act': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'comedy': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'dance': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'keyboard instruments': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'oratory': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'perscussion instruments': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'string instruments': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'wind instruments': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'sing':{
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                }
            },
            'Profession' : {
                'architect': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'baker': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'barrister': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'brewer': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'butcher': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'clerk': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'cook': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'courtesan': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'driver': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'engineer': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'farmer': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'fisherman': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'gambler': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'gardener': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'herbalist': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'innkeeper': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'librarian': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'merchant': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'midwife': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'miller': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'miner': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'porter': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'sailor': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'scribe': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'shepherd': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'stable master': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'master': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'soldier': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'tanner': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'trapper': {
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                },
                'woodcutter':{
                    'ranks': 0,
                    'class': false,
                    'bonuses': {}
                }
            },
            'Ride' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Sense Motive' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Sleight of Hand' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Spellcraft' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Stealth' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Survival' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Swim' : {
                'ranks': 0,
                'class': false,
                'bonuses': {}
            },
            'Use Magic Device' :{
                'ranks': 0,
                'class': false,
                'bonuses': {}
            }
        }
    },
    'Spells': {
        'Known': {
        },
        'Prepared': {
        },
        'Per_Day': {
        },
        'Caster_Level': {
            'arcane': 0,
            'divine': 0
        }
    },
    'Status': {
        'HP': 0,
        'Temp': 0,
        'Current': 0,
        'Nonlethal': 0,
        'DR': {},
        'Effects': {}
    },
    'Attacks': [
        {'atk_mod': ['STR'], 'dmg_mod': ['STR']}
    ]

}

const exp_table = {
    'slow': {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0

    }, 'medium': {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0

    }, 'fast': {
        1: 0,
        2: 1300,
        3: 3300,
        4: 6000,
        5: 10000,
        6: 15000,
        7: 23000,
        8: 34000,
        9: 50000,
        10: 71000,
        11: 105000,
        12: 145000,
        13: 210000,
        14: 295000,
        15: 425000,
        16: 600000,
        17: 850000,
        18: 1200000,
        19: 1700000,
        20: 2400000
    }

}

export default character_template;
