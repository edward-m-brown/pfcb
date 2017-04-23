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
    'Race': {

    },
    'Size': {

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
            'strMod': false,
            'conMod': false,
            'intMod': false,
            'wisMod': false,
            'chaMod': false

        },
        'Touch_exclude': {
            'Armor Bonus': true,
            'Shield Bonus': true,
            'Natural Armor': true,
        },
        'Flat-footed_exclude': {
            'DEX Modifier': true,
            'Dodge Bonus': true
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
    'Skills': {
        'Total Ranks': 0,
        'Ranks Used': 0,
        'Skill_Table': {
            'Acrobatics' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Appraise' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Bluff' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Climb' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Craft' : {
                'alchemy': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'armor': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'bows': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'poison': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'weapons': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'traps':{
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                }
            },
            'Diplomacy' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Disable Device' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Disguise' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Escape Artist' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Fly' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Handle Animal' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Heal' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Intimidate' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Knowledge' : {
                'arcana' : {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'dungeoneering' : {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'engineering' : {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'geography' : {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'history' : {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'local' : {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'nature' : {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'nobility' : {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'planes' : {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'religion' :{
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                }
            },
            'Linguistics' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Perception' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Perform' : {
                'act': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'comedy': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'dance': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'keyboard instruments': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'oratory': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'perscussion instruments': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'string instruments': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'wind instruments': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'sing':{
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                }
            },
            'Profession' : {
                'architect': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'baker': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'barrister': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'brewer': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'butcher': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'clerk': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'cook': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'courtesan': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'driver': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'engineer': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'farmer': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'fisherman': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'gambler': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'gardener': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'herbalist': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'innkeeper': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'librarian': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'merchant': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'midwife': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'miller': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'miner': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'porter': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'sailor': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'scribe': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'shepherd': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'stable master': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'master': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'soldier': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'tanner': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'trapper': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                },
                'woodcutter':{
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0
                }
            },
            'Ride' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Sense Motive' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Sleight of Hand' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Spellcraft' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Stealth' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Survival' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Swim' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
            },
            'Use Magic Device' :{
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0
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
