var $=require('jquery');
import Abilities from './sheet_components/Abilities'
import Description from './sheet_components/Description'
import Levels from './sheet_components/Levels'
import Movement from './sheet_components/Movement'

// helpers
function calculateAbilityModifiers(ability_scores) {
    let ability_mods = {};
    Object.keys(ability_scores).map((key) => {
        let score = ability_scores[key];
        ability_mods[key] = score? Math.floor((score - 10)/2) : 0;
    });
    return ability_mods;
}

function calculateTempModifiers(temp_adjustments, base_scores) {
    let temp_modifiers = {};
    Object.keys(temp_adjustments).map((key) => {
        let adjustment = temp_adjustments[key];
        let base_score = base_scores[key];
        temp_modifiers[key] = adjustment && base_score? Math.floor((base_score + adjustment - 10)/2) : 0;
    });
    return temp_modifiers;
}

// CharacterSheet component
var CharacterSheet = React.createClass({
    getInitialState() {
        // CharacterSheet state is primarily for storing bonuses calculated within child components which
        // will be needed by multiple other child components.
        let character = $.extend(true, {}, this.props.character);
        let base_scores = Object.assign({}, character["Ability_Scores"]["base"]); // avoids mutation
        let temp_adjustments = Object.assign({}, character["Ability_Scores"]["temp"]); // avoids mutation
        return {
            ability_mods: calculateAbilityModifiers(base_scores),
            temp_mods: calculateTempModifiers(temp_adjustments, base_scores),
            character: character
        }
    },
    deselectCharacter() {
        this.saveCharacter();
        this.props.deselectCharacter();
    },
    updateCharacter(updateType, value, objectKey='') {
        let character = $.extend(true, {}, this.state.character);
        switch(updateType) {
            case 'base_score': {
                character["Ability_Scores"]["base"][objectKey] = value;
                this.setTempModifiers(this.state.character["Ability_Scores"]["temp"], scores)
                break;
            }
            case 'class_levels': {
                character['Levels']['Class_Levels'][objectKey] = value > 0? value: 1;
                break;
            }
            case 'description': {
                character["Description"][objectKey] = value;
                break;
            }
            case 'exp': {
                character['Levels']['Exp'] = value;
                break;
            }
            case 'movement': {
                character['Movement'][objectKey] = value;
                break;
            }
            case 'name': {
                character["Name"] = value;
                break;
            }
            case 'remove_class': {
                delete character['Levels']['Class_Levels'][value];
                break;
            }
            case 'temp_score': {
                let adjustments = character["Ability_Scores"]["temp"];
                adjustments[objectKey] = value;
                this.setTempModifiers(adjustments, this.state.character["Ability_Scores"]["base"]);
                break;
            }
            case 'default': {
                console.log('updateCharacter('+updateType+')')
                break;
            }
        }
        this.setState({character: character});

    },
    updateAbilityScores(name, score) {
        let character = $.extend(true, {}, this.state.character);
        let scores = character["Ability_Scores"]["base"];
        scores[name] = score;
        console.log("updateAbilityScores: ", name, score);
        this.setState({character: character});
        this.setAbilityModifiers(scores);
        this.setTempModifiers(this.state.character["Ability_Scores"]["temp"], scores); // always update temp mods
    },
    updateTempAdjustments(name, adjustment) {
        let character = $.extend(true, {}, this.state.character);
        let adjustments = character["Ability_Scores"]["temp"];
        adjustments[name] = adjustment;
        console.log("updateTempAdjustments: ", name, adjustment);
        this.setState({character: character});
        this.setTempModifiers(adjustments, this.state.character["Ability_Scores"]["base"]);
    },
    setAbilityModifiers(scores){
        this.setState({
            ability_mods: calculateAbilityModifiers(scores)
        });
    },
    setTempModifiers(adjustments, base_scores) {
        this.setState({
           temp_mods: calculateTempModifiers(adjustments, base_scores)
        });
    },
    saveCharacter(){
        this.props.updateCharacter(this.state.character);
    },
    componentWillMount(){
        // use this function for AJAX

    },
    componentWillUnmount(){

    },
    render(){
        return (
            <div className="container">
                <div className="row">
                    <Description characterName={this.state.character["Name"]}
                        description={this.state.character["Description"]}
                        updateCharacter={this.updateCharacter}/>
                </div>
                <div className="row">
                    <Levels levels={this.state.character['Levels']}
                        classes={this.props.baseClasses}
                        updateCharacter={this.updateCharacter}/>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <Abilities abilityScores={this.state.character["Ability_Scores"]["base"]}
                            abilityMods={this.state.ability_mods}
                            tempAdjustments={this.state.character["Ability_Scores"]["temp"]}
                            tempMods={this.state.temp_mods}
                            updateCharacter={this.updateCharacter}
                            updateBase={this.updateAbilityScores}
                            updateTemp={this.updateTempAdjustments}
                        />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <Movement movement={this.state.character['Movement']} updateCharacter={this.updateCharacter}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <button type="button" className="btn btn-info btn-md" onClick={ this.deselectCharacter }>
                            <span className="glyphicon glyphicon-transfer"></span> Switch Characters
                        </button>
                    </div>
                </div>
            </div>
        )
    }
});

export default CharacterSheet;

