var $=require('jquery');
import Abilities from './sheet_components/Abilities'

// helpers
function calculateAbilityModifiers(ability_scores) {
    let ability_mods = {};
    Object.keys(ability_scores).map((key) => {
        ability_mods[key] = Math.floor((ability_scores[key] - 10)/2);
    });
    return ability_mods;
}

function calculateTempScores(temp_adjustments, base_scores) {
    let temp_scores = {};
    Object.keys(temp_adjustments).map((key) => { temp_scores[key] = base_scores[key] + temp_adjustments[key] });
    return temp_scores;
}

const default_char = {
    'Name': '',
    'Description' : {
        'Alignment': null,
        'Deity': 'Loki',
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
        'Class_Levels': []
    },
    'Ability_Scores': {
        'STR': 0,
        'DEX': 0,
        'CON': 0,
        'INT': 0,
        'WIS': 0,
        'CHA': 0
    },
    'Temp. Modifiers': {

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
        }
    }
}

// CharacterSheet component
var CharacterSheet = React.createClass({
    getInitialState() {
        // CharacterSheet state is primarily for storing bonuses calculated within child components which
        // will be needed by multiple other child components.
        let base_scores = Object.assign({}, this.props.character["Ability_Scores"]["base"]); // avoids mutation
        let temp_adjustments = Object.assign({}, this.props.character["Ability_Scores"]["temp_adj"]); // avoids mutation
        return {
            ability_mods: calculateAbilityModifiers(base_scores),
            ability_scores: base_scores,
            temp_adjustments: temp_adjustments,
            temp_mods: calculateAbilityModifiers(calculateTempScores(temp_adjustments, base_scores))
        }
    },
    updateAbilityScores(name, score, temp=false) {
        let state = temp? this.state.temp_adjustments: this.state.ability_scores;
        let scores = Object.assign({}, state);
        scores[name] = score;
        console.log(scores)
        let update = temp? {temp_adjustments: scores}: {ability_scores: scores};
        this.setState(update);
        let base_scores = temp? this.state.ability_scores: null;
        this.setAbilityModifiers(scores, base_scores);
    },
    setAbilityModifiers(scores, base_scores=null){
        let state = base_scores?
            {temp_mods: calculateAbilityModifiers(calculateTempScores(scores, base_scores))}
            : {ability_mods: calculateAbilityModifiers(scores)}
        this.setState(state);
    },
    componentWillMount(){
    },
    render(){
        let that = this
        return (
            <div>
                <Abilities abilityScores={ this.state.ability_scores }
                           abilityMods={this.state.ability_mods}
                           tempAdjustments={this.state.temp_adjustments}
                           tempMods={this.state.temp_mods}
                           update={this.updateAbilityScores}
                />

                <button type="button" className="btn btn-info btn-md" onClick={ this.props.deselectCharacter }>
                    <span className="glyphicon glyphicon-transfer"></span> Switch Characters
                </button>
            </div>
        )
    }
});

export default CharacterSheet;

