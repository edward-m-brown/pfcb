const character_template = {
    'Name': 'Unknown Hero',
    'Description' : {
        'Alignment': 'LG',
        'Deity': 'N/A',
        'Race': 'Human',
        'Size': 'Medium',
        'Gender': 'N/A',
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
        }, 'temp': {
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
        }, 'AC_include': {
            'strMod': false,
            'conMod': false,
            'intMod': false,
            'wisMod': false,
            'chaMod': false
        }, 'Touch_exclude': {
            'Armor Bonus': true,
            'Shield Bonus': true,
            'Natural Armor': true,
        }, 'Flat-footed_exclude': {
            'DEX Modifier': true,
            'Dodge Bonus': true
        }, 'Saves': {
            'Fortitude': {
                'Base Save': 0,
                'Magic Modifier': 0,
                'Misc Modifier': 0,
                'Temporary Modifier': 0
            }, 'Reflex': {
                'Base Save': 0,
                'Magic Modifier': 0,
                'Misc Modifier': 0,
                'Temporary Modifier': 0
            }, 'Will': {
                'Base Save': 0,
                'Magic Modifier': 0,
                'Misc Modifier': 0,
                'Temporary Modifier': 0
            }, 'Modifiers': ''
        }, 'Spell Resistance': 0
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
                'Misc Mod': 0,
                'show': true

            }, 'Appraise' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': true

            }, 'Bluff' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': true

            }, 'Climb' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': true

            }, 'Craft' : {
                'alchemy': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false,

                },
                'armor': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                },
                'bows': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                },
                'poison': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                },
                'weapons': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                },
                'traps':{
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }
            }, 'Diplomacy' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': true
            }, 'Disable Device' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': false
            }, 'Disguise' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': false
            }, 'Escape Artist' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': true
            }, 'Fly' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': false
            },
            'Handle Animal' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': false
            }, 'Heal' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': false
            }, 'Intimidate' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': false
            }, 'Knowledge' : {
                'arcana' : {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'dungeoneering' : {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'engineering' : {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'geography' : {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'history' : {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'local' : {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'nature' : {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'nobility' : {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'planes' : {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'religion' :{
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }
            }, 'Linguistics' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': false
            }, 'Perception' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': true
            }, 'Perform' : {
                'act': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'comedy': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'dance': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'keyboard instruments': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'oratory': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'perscussion instruments': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'string instruments': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'wind instruments': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'sing':{
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }
            }, 'Profession' : {
                'architect': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'baker': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'barrister': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'brewer': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'butcher': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'clerk': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'cook': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'courtesan': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'driver': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'engineer': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'farmer': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'fisherman': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'gambler': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'gardener': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'herbalist': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'innkeeper': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'librarian': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'merchant': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'midwife': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'miller': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'miner': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'porter': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'sailor': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'scribe': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'shepherd': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'stable master': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'master': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'soldier': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'tanner': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'trapper': {
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }, 'woodcutter':{
                    'Ranks': 0,
                    'class': false,
                    'Misc Mod': 0,
                    'show': false
                }
            }, 'Ride' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': false
            }, 'Sense Motive' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': true
            }, 'Sleight of Hand' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': false
            }, 'Spellcraft' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': false
            }, 'Stealth' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': true
            }, 'Survival' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': false
            }, 'Swim' : {
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': true
            }, 'Use Magic Device' :{
                'Ranks': 0,
                'class': false,
                'Misc Mod': 0,
                'show': false
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
    }

};

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
