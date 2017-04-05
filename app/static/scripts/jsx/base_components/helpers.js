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
        'Base': 0,
        'Fly': 0,
        'Swim': 0,
        'Climb': 0,
        'Burrow': 0
    },
    'Feats': [],
    'Special_Abilities' : {
        'Abilities': [],
        'Class_Features': []
    },
    'Spells': {
        'Known': {
        },
        'Prepared': {
        },
        'Caster_Level': {
            'arcane': 0,
            'divine': 0
        }
    },
    'Skills': {
        'Class': [],
        'Total_Ranks': 0,
        'Skill_Table': {
            'Acrobatics' : 0,
            'Appraise' : 0,
            'Bluff' : 0,
            'Climb' : 0,
            'Craft' : {
                'alchemy': 0,
                'armor': 0,
                'bows': 0,
                'poison': 0,
                'weapons': 0,
                'traps': 0
            },
            'Diplomacy' : 0,
            'Disable Device' : 0,
            'Disguise' : 0,
            'Escape Artist' : 0,
            'Fly' : 0,
            'Handle Animal' : 0,
            'Heal' : 0,
            'Intimidate' : 0,
            'Knowledge' : {
                'arcana' : 0,
                'dungeoneering' : 0,
                'engineering' : 0,
                'geography' : 0,
                'history' : 0,
                'local' : 0,
                'nature' : 0,
                'nobility' : 0,
                'planes' : 0,
                'religion' : 0
            },
            'Linguistics' : 0,
            'Perception' : 0,
            'Perform' : {
                'act': 0,
                'comedy': 0,
                'dance': 0,
                'keyboard instruments': 0,
                'oratory': 0,
                'perscussion instruments': 0,
                'string instruments': 0,
                'wind instruments': 0,
                'sing': 0
            },
            'Profession' : {
                'architect': 0,
                'baker': 0,
                'barrister': 0,
                'brewer': 0,
                'butcher': 0,
                'clerk': 0,
                'cook': 0,
                'courtesan': 0,
                'driver': 0,
                'engineer': 0,
                'farmer': 0,
                'fisherman': 0,
                'gambler': 0,
                'gardener': 0,
                'herbalist': 0,
                'innkeeper': 0,
                'librarian': 0,
                'merchant': 0,
                'midwife': 0,
                'miller': 0,
                'miner': 0,
                'porter': 0,
                'sailor': 0,
                'scribe': 0,
                'shepherd': 0,
                'stable master': 0,
                'master': 0,
                'soldier': 0,
                'tanner': 0,
                'trapper': 0,
                'woodcutter': 0
            },
            'Ride' : 0,
            'Sense Motive' : 0,
            'Sleight of Hand' : 0,
            'Spellcraft' : 0,
            'Stealth' : 0,
            'Survival' : 0,
            'Swim' : 0,
            'Use Magic Device' : 0
        }
    }
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
