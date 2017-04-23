/**
 * Created by edward on 4/8/17.
 */
import AddBoxes from '../base_components/AddBoxes'
import Reference from '../base_components/Reference'

const Skills = React.createClass({
    makeBoxes(skillName, skill, abilityMod) {
        return {
            name: skillName, 'Ability Mod': {
                value: abilityMod
            }, 'Ranks': {
                value: skill['Ranks'],
                edit: true,
                change: this.updateSkill
            }, 'Class Bonus': {
                value: skill['class'] && skill['Ranks']? 3: 0
            }, 'Misc Mod': {
                value: skill['Misc Mod'],
                edit: true,
                change: this.updateSkill
            }
        }

    },
    makeRow(skillName, subSkill='') {
        let skillTable = this.props.skills['Skill_Table'];
        let skill = subSkill? skillTable[skillName][subSkill]: skillTable[skillName];
        let name = subSkill? skillName + " (" + subSkill + ")": skillName;
        let dbSkill = this.props.dbSkills[skillName];
        let abilityMod; let abilityName = dbSkill['Attribute'];
        if (abilityName == "Str") abilityMod = this.props.strMod;
        else if (abilityName == "Dex") abilityMod = this.props.dexMod;
        else if (abilityName == "Con") abilityMod = this.props.conMod;
        else if (abilityName == "Int") abilityMod = this.props.intMod;
        else if (abilityName == "Wis") abilityMod = this.props.wisMod;
        else if (abilityName == "Cha") abilityMod = this.props.chaMod;
        else console.log("makeRow:: weird ability name: " + abilityName)
        let boxes = this.makeBoxes(name, skill, abilityMod);
        return (
            <tr>
                <td>
                    <input type="checkbox" checked={skill['class']} onClick={this.toggleClassSkill}
                        data-checked={skill['class']} data-name={skillName} data-child={subSkill}/>
                </td>
                <td>{name}&nbsp;{dbSkill['TO']? '*': ''}</td>
                <td> <AddBoxes boxes={boxes}/> </td>
            </tr>
        );
    },
    toggleClassSkill(e) {
        let data = e.target.dataset;
        this.props.updateCharacter('class_skill', !(data.checked == "true"), data.name, data.child);
    },
    updateSkill(e) {
        let data = e.target.dataset; let intValue = parseInt(e.target.value); let value = intValue? intValue: 0;
        this.props.updateCharacter('skill_table', value, data.parent, data.name);
    },
    render() {
        let skillTable = this.props.skills['Skill_Table'];
        let skillNames = Object.keys(skillTable).sort();
        return(
            <div>
                <h1 className="field-block">Skills</h1>
                <table>
                    <tr>
                        <th></th>
                        <th><sub> Skill Name </sub></th>
                        <th></th>
                    </tr>
                    {skillNames.map((skillName)=>{
                        if(skillTable[skillName]['Ranks'] >= 0){
                            return (this.makeRow(skillName, ''))
                        } else {
                            return Object.keys(skillTable[skillName]).sort().map((subSkill)=>{
                                return (this.makeRow(skillName, subSkill))
                            })
                        }
                    })}
                </table>
            </div>
        )
    }
});

export default Skills;