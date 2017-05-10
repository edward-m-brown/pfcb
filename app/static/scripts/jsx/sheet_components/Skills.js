/**
 * Created by edward on 4/8/17.
 */
import AddBoxes from '../base_components/AddBoxes'
import Reference from '../base_components/Reference'

const Skills = React.createClass({
    getInitialState() {
        return {info: '', filter: 'favorites', search: ''}
    },
    filterSkill(skillName, subSkill='') {
        let skillTable = this.props.skills['Skill_Table'];
        let skill = subSkill? skillTable[skillName][subSkill]: skillTable[skillName];
        let lowerSkill = skillName.toLowerCase();
        let lowerSearch = this.state.search.toLowerCase();
        let lowerSub = subSkill.toLowerCase();
        let searchMatch = (lowerSearch && lowerSkill.search(lowerSearch) >= 0)
            || (lowerSearch && lowerSub.search(lowerSearch) >= 0)
        switch(this.state.filter){
            case 'all': {
                return(!lowerSearch || searchMatch)
            }
            case 'class': {
                return (skill['class'] || searchMatch);
            }
            case 'favorites': {
                return (skill['show'] || searchMatch);
            }
            case 'trained': {
                return (skill['Ranks'] > 0 || searchMatch);
            }
        }
    },
    makeBoxes(skillName, skill, abilityMod, abilityName) {
        return {
            name: skillName, [abilityName.toUpperCase()]: {
                value: abilityMod,
                labelSide: true
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
        };

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
        let boxes = this.makeBoxes(name, skill, abilityMod, abilityName);
        return (
            <div className="flex-container bordered"
                style={{justifyContent: "space-between", borderColor: "silver", borderRadius: 2}}>
                <div className="flex-item">
                    <input type="checkbox" checked={skill['class']} onClick={this.toggleClassSkill}
                        data-checked={skill['class']} data-name={skillName} data-child={subSkill}
                        title={skill['class'] ? "Remove from Class Skills" : "Add to Class Skills"}/>
                    <a data-name={skillName} onClick={this.setInfo} title="Show Skill Reference"
                       data-toggle="modal" data-target="#skillReference">
                        {subSkill
                            ? <span data-name={skillName}>{name.split('(')[0]}
                                 <small data-name={skillName}>({subSkill})</small>
                              </span>
                            : name}
                    </a>
                    &nbsp;
                    {dbSkill['TO']? <sup title="Trained Only">*</sup>: ''}
                    {dbSkill['ACP']? <sup title="Armor Check Penalty">&#123;ACP&#125;</sup>: ''}<br/>
                    <button data-name={skillName} data-child={subSkill} data-favorite={skill['show']}
                        onClick={this.toggleShow} style={skill['show']? {backgroundColor: "black"}: {}}
                        className="btn btn-xs" title={skill["show"]? "Unfavorite " + name: "Favorite " + name}>
                        <span className={skill['show']? "glyphicon glyphicon-star": "glyphicon glyphicon-star-empty"}
                           data-name={skillName} data-child={subSkill} data-favorite={skill['show']}
                           style={skill['show']? {color: "gold"}: {}}/>
                    </button>
                </div>
                <div className="small-item"> <AddBoxes boxes={boxes} className="no-wrap"/> </div>
            </div>
        );
    },
    setFilter(e) {
        this.setState({filter: e.target.value})
    },
    setSearch(e) {
        this.setState({search: e.target.value})
    },
    setInfo(e) {
        this.setState({info: e.target.dataset.name});
    },
    toggleClassSkill(e) {
        let data = e.target.dataset;
        this.props.updateCharacter('class_skill', !(data.checked == "true"), data.name, data.child);
    },
    toggleShow(e) {
        let data = e.target.dataset;
        this.props.updateCharacter('skill_show', !(data.favorite == "true"), data.name, data.child);
    },
    updateSkill(e) {
        let data = e.target.dataset; let intValue = parseInt(e.target.value);
        let value = intValue && intValue >= 0 ? intValue: 0;
        if(data.name == "Ranks" && value > this.props.characterLevel) {
            alert("The maximum Ranks this character can have in a skill is: " + this.props.characterLevel
                + ".\nYou tried to increase " + data.parent + " to " + value + ".\n Do you need to Level Up?")
            return
        }
        this.props.updateCharacter('skill_table', value, data.parent, data.name);
    },
    render() {
        let skillTable = this.props.skills['Skill_Table'];
        let skillNames = Object.keys(skillTable).sort();
        let filterNames = ['All', 'Class', 'Trained', 'Favorites'];
        let totalRanks = this.props.skills['Class Ranks'] + (this.props.characterLevel * this.props.intMod)
        return(
            <div className="col-xs-12 col-md-6 flex-container-col bordered">
                <h3 className="field-block">Skills</h3>
                <div className="">
                    <label className="col-xs-6">
                        Show:&nbsp;
                        <select onChange={this.setFilter} value={this.state.filter}>
                            {filterNames.map((filterName)=>{
                                return <option value={filterName.toLowerCase()}>{filterName}</option> })}
                        </select>
                    </label>
                    <input type="text" onChange={this.setSearch} value={this.state.search}
                        placeholder="Search skill names" className="col-xs-5"/>
                    <div className="col-xs-1"></div>
                </div>
                <div className=""><h5><b>Skill Ranks:</b></h5></div>
                <div className="flex-container" style={{justifyContent: "space-between"}}>
                    <text>Total: {totalRanks}</text>
                    <text>Used: {this.props.skills['Ranks Used']}</text>
                    <text>
                        Available: {totalRanks - this.props.skills['Ranks Used']}
                    </text>
                    <text>Max.: {this.props.characterLevel}</text>
                </div>
                <hr/>
                {skillNames.map((skillName)=>{
                    let lowerSkill = skillName.toLowerCase();
                    let lowerSearch = this.state.search.toLowerCase();
                    if(skillTable[skillName]['Ranks'] >= 0){
                        if(this.filterSkill(skillName))
                            return (this.makeRow(skillName, ''))
                    } else {
                        return Object.keys(skillTable[skillName]).sort().map((subSkill)=>{
                            if(this.filterSkill(skillName, subSkill))
                                return (this.makeRow(skillName, subSkill))
                        })
                    }
                }, this)}
                <Reference referenceName="skillReference" labelName="Skill" dbObjects={this.props.dbSkills}
                    info={this.state.info}/>
            </div>
        )
    }
});

export default Skills;