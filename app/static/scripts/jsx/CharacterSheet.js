var $=require('../../bower_components/jquery/dist/jquery');
import Abilities from './sheet_components/Abilities'
import Description from './sheet_components/Description'
import Levels from './sheet_components/Levels'
import Movement from './sheet_components/Movement'
import Status from './sheet_components/Status'
import Feats from './sheet_components/Feats'
import Offense from './sheet_components/Offense'
import Defense from './sheet_components/Defense'
import Skills from './sheet_components/Skills'
import Weapons from './sheet_components/Weapons'


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

const featTemplate = {
    'Name': '',
    'Notes': ''
};

// CharacterSheet component
const CharacterSheet = React.createClass({
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
    updateCharacter(updateType, value, objectKey='', nestedKey='', otherKey='') {
        let character = $.extend(true, {}, this.state.character);
        switch(updateType) {
            case 'AC_update': {
                character['Defense']['AC'][objectKey] = value;
                break;
            }
            case 'add_weapons': {
                character['Weapons'] = value;
                break;
            }
            case 'BAB': {
                character['Offense']['BAB'] = value >= 0? value: 0;
                break;
            }
            case 'class_skill': {
                if(nestedKey) character['Skills']['Skill_Table'][objectKey][nestedKey]['class'] = value;
                else character['Skills']['Skill_Table'][objectKey]['class'] = value;
                break;
            }
            case 'cmb_mod': {
                character['Offense']['CMB Modifiers'] = value;
                break;
            }
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
            case 'feats': {
                let feat = Object.assign({}, featTemplate);
                feat['Name'] = value;
                feat['Index'] = character['Feats'].length;
                character['Feats'].push(feat);
                break;
            }
            case 'initiative': {
                character['Offense']['Initiative Modifier'] = value;
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
            case 'remove_feat': {
                character['Feats'].splice(value, 1);
                break;
            }
            case 'save': {
                if(nestedKey) character['Defense']['Saves'][objectKey][nestedKey] = value;
                else character['Defense']['Saves'][objectKey] = value;
                break;
            }
            case 'skill_show': {
                if(nestedKey) character['Skills']['Skill_Table'][objectKey][nestedKey]['show'] = value;
                else character['Skills']['Skill_Table'][objectKey]['show'] = value;
                break;
            }
            case 'skill_table': {
                let splitKey = objectKey.split(" (")
                let skillName = splitKey.length > 1? splitKey[0]: objectKey;
                let subSkill = splitKey.length > 1? splitKey[1].split(")")[0]: null;
                if(subSkill) character['Skills']['Skill_Table'][skillName][subSkill][nestedKey] = value;
                else character['Skills']['Skill_Table'][skillName][nestedKey] = value;
                break;
            }
            case 'status': {
                if(nestedKey){
                    character['Status'][objectKey][nestedKey] = value;
                } else {
                    character['Status'][objectKey] = value;
                }
                break;
            }
            case 'temp_score': {
                let adjustments = character["Ability_Scores"]["temp"];
                adjustments[objectKey] = value;
                this.setTempModifiers(adjustments, this.state.character["Ability_Scores"]["base"]);
                break;
            }
            case 'weapon': {
                if(otherKey || otherKey == 0)
                    character['Weapons'][objectKey][nestedKey][otherKey] = value;
                else
                    character['Weapons'][objectKey][nestedKey] = value;
                break;
            }
            case 'weapon_bonus': {
                if(otherKey == "remove"){
                    character['Weapons'][objectKey][nestedKey]
                        .splice(character['Weapons'][objectKey][nestedKey].indexOf(value),1)
                } else character['Weapons'][objectKey][nestedKey].push(value);
                break;
            }
            default: {
                console.log('updateCharacter(' + updateType + ')')
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
        this.props.saveCharacter(this.state.character);
    },
    componentWillMount(){
        // use this function for AJAX

    },
    componentWillUnmount(){

    },
    render(){
        let strMod = this.state.character['Ability_Scores']['temp']['STR']
            ? this.state.temp_mods['STR']
            : this.state.ability_mods['STR'];
        let dexMod = this.state.character['Ability_Scores']['temp']['DEX']
            ? this.state.temp_mods['DEX']
            : this.state.ability_mods['DEX'];
        let conMod = this.state.character['Ability_Scores']['temp']['CON']
            ? this.state.temp_mods['CON']
            : this.state.ability_mods['CON'];
        let intMod = this.state.character['Ability_Scores']['temp']['INT']
            ? this.state.temp_mods['INT']
            : this.state.ability_mods['INT'];
        let wisMod = this.state.character['Ability_Scores']['temp']['WIS']
            ? this.state.temp_mods['WIS']
            : this.state.ability_mods['WIS'];
        let chaMod = this.state.character['Ability_Scores']['temp']['CHA']
            ? this.state.temp_mods['CHA']
            : this.state.ability_mods['CHA'];
        return (
            <div className="container">
                <div className="row">
                    {/*
                     <div className="col-xs-12 col-md-6">
                     <img src="/static/assets/pflogo_small.png"/>
                     </div>
                     */}
                    <Description characterName={this.state.character["Name"]}
                        description={this.state.character["Description"]}
                        updateCharacter={this.updateCharacter}/>
                </div>
                <div className="row">
                    <Levels levels={this.state.character['Levels']}
                        classes={this.props.baseClasses}
                        updateCharacter={this.updateCharacter}/>
                    <Status status={this.state.character['Status']} updateCharacter={this.updateCharacter}/>
                    <Movement movement={this.state.character['Movement']} updateCharacter={this.updateCharacter}/>
                </div>
                <div className="row">
                    <Abilities abilityScores={this.state.character["Ability_Scores"]["base"]}
                        abilityMods={this.state.ability_mods}
                        tempAdjustments={this.state.character["Ability_Scores"]["temp"]}
                        tempMods={this.state.temp_mods}
                        updateCharacter={this.updateCharacter}
                        updateBase={this.updateAbilityScores}
                        updateTemp={this.updateTempAdjustments}/>
                </div>
                <div className="row">
                    <Offense offense={this.state.character['Offense']} dexMod={dexMod} strMod={strMod}
                             updateCharacter={this.updateCharacter}/>
                    <Defense defense={this.state.character['Defense']} dexMod={dexMod} conMod={conMod} wisMod={wisMod}
                             updateCharacter={this.updateCharacter}/>
                    <Skills dbSkills={this.props.skills} skills={this.state.character['Skills']}
                        strMod={strMod} dexMod={dexMod} conMod={conMod} intMod={intMod} wisMod={wisMod} chaMod={chaMod}
                        updateCharacter={this.updateCharacter}/>
                </div>
                <div className="row">
                    <Weapons weapons={this.state.character['Weapons']} strMod={strMod} dexMod={dexMod} conMod={conMod}
                        intMod={intMod} wisMod={wisMod} chaMod={chaMod} baseAttack={this.state.character['Offense']['BAB']}
                        updateCharacter={this.updateCharacter}/>
                </div>
                <div className="row">
                    <Feats dbFeats={this.props.feats} characterFeats={this.state.character['Feats']}
                           updateCharacter={this.updateCharacter} />
                </div>

                <div className="row">
                    <div className="col-md-12">
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

