var $=require('jquery');
import Abilities from './sheet_components/Abilities'

// helper functions
function calculateAbilityModifiers(ability_scores) {
    let ability_mods = {};
    Object.keys(ability_scores).map((key) => {
        ability_mods[key] = Math.floor((ability_scores[key] - 10)/2);
    });
    return ability_mods;
}

// CharacterSheet component
var CharacterSheet = React.createClass({
    getInitialState() {
        // CharacterSheet state is primarily for storing bonuses calculated within child components which
        // will be needed by multiple other child components.
        let ability_scores = Object.assign({}, this.props.character["Ability_Scores"]); // assign avoids mutation
        return {
            ability_mods: calculateAbilityModifiers(ability_scores),
            ability_scores: ability_scores
        }
    },
    updateAbilityScore(name, score) {
        let scores = Object.assign({}, this.state.ability_scores);
        scores[name] = score;
        console.log(scores)
        this.setState({ability_scores: scores});
        this.setAbilityModifiers(scores);
    },
    setAbilityModifiers(curScores=null){
        let ability_scores = curScores? curScores: this.props.character["Ability_Scores"];
        this.setState({ ability_mods: calculateAbilityModifiers(ability_scores) });
    },
    componentWillMount(){
    },
    render(){
        let that = this
        return (
            <div>
                <Abilities abilityScores={ this.state.ability_scores }
                           abilityMods={this.state.ability_mods}
                           update={this.updateAbilityScore}
                />

                <button type="button" className="btn btn-info btn-md" onClick={ this.props.deselectCharacter }>
                    <span className="glyphicon glyphicon-transfer"></span> Switch Characters
                </button>
            </div>
        )
    }
});

export default CharacterSheet;

