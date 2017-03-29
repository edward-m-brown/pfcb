var $=require('jquery');
import Abilities from './sheet_components/Abilities'
import Description from './sheet_components/Description'

// helpers
function calculateAbilityModifiers(ability_scores) {
    let ability_mods = {};
    Object.keys(ability_scores).map((key) => {
        ability_mods[key] = Math.floor((ability_scores[key] - 10)/2);
    });
    return ability_mods;
}

function calculateTempModifiers(temp_adjustments, base_scores) {
    let temp_modifiers = {};
    Object.keys(temp_adjustments).map((key) => {
        let adjustment = temp_adjustments[key]
        temp_modifiers[key] = adjustment? Math.floor((base_scores[key] + temp_adjustments[key] - 10)/2) : 0
    });
    return temp_modifiers;
}

// CharacterSheet component
var CharacterSheet = React.createClass({
    getInitialState() {
        // CharacterSheet state is primarily for storing bonuses calculated within child components which
        // will be needed by multiple other child components.
        let character = Object.assign({}, this.props.character);
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
    updateAbilityScores(name, score) {
        let character = Object.assign({}, this.state.character);
        let scores = character["Ability_Scores"]["base"];
        scores[name] = score;
        console.log("updateAbilityScores: ", name, score);
        this.setState({character: character});
        this.setAbilityModifiers(scores);
        this.setTempModifiers(this.state.character["Ability_Scores"]["temp"], scores); // always update temp mods
    },
    updateTempAdjustments(name, adjustment) {
        let character = Object.assign({}, this.state.character);
        let adjustments = character["Ability_Scores"]["temp"];
        adjustments[name] = adjustment;
        console.log("updateTempAdjustments: ", name, adjustment);
        this.setState({character: character});
        this.setTempModifiers(adjustments, this.state.character["Ability_Scores"]["base"]);
    },
    updateName(name) {
        let character = Object.assign({}, this.state.character);
        character["Name"] = name;
        console.log("updateName: ", name);
        this.setState({character: character});
    },
    updateDescription(key, value) {
        let character = Object.assign({}, this.state.character);
        character["Description"][key] = value;
        console.log("updateDescription: ", key, value);
        this.setState({character: character});
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
                        levels={this.state.character['Levels']['Class_Levels']}
                        updateName={this.updateName}
                        updateDescription={this.updateDescription}
                    />
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                    <Abilities abilityScores={this.state.character["Ability_Scores"]["base"]}
                               abilityMods={this.state.ability_mods}
                               tempAdjustments={this.state.character["Ability_Scores"]["temp"]}
                               tempMods={this.state.temp_mods}
                               updateBase={this.updateAbilityScores}
                               updateTemp={this.updateTempAdjustments}
                    />
                    </div>
                </div>
                <div className="flex-item">
                    <div className="flex-container">
                        <div className="flex-item">
                            <button type="button" className="btn btn-info btn-md" onClick={ this.deselectCharacter }>
                                <span className="glyphicon glyphicon-transfer"></span> Switch Characters
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default CharacterSheet;

