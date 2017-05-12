/**
 * Created by edward on 4/3/17.
 */
import Manager from '../base_components/Manager'
import Reference from '../base_components/Reference'
const Classes = React.createClass({
    getInitialState() {
        return {info: ''}
    },
    componentWillMount(){
        // ajax here, if needed
    },
    update(e) {
        this.props.update(e.target.name, parseInt(e.target.value));
    },
    updateStats() {
        let conf_msg = "Update Character will override all current values for Base Attack Bonus, "
            + "Class Skills, and any Base Saving Throw score values, and will replace them with values derived from "
            + "the character's class levels.\n\n"
            + "It will also attempt to assign Special Abilities and Class Features based on class levels.\n\n"
            + "This could lead to undesired effects in characters built using homebrew rules, as this application uses "
            + "the official Pathfinder core rulebook rule set."
            + "\n\nClick OK to continue."
        if(!confirm(conf_msg))
            return;
        let updates = {
            hd : 0, fort : 0, ref : 0, will : 0, bab : 0, skillRanks : [], skills: []
        };
        let classNames = Object.keys(this.props.classes);
        Object.keys(this.props.classLevels).map((className)=>{
            let numLevels = this.props.classLevels[className];
            if(classNames.includes(className)) { // we can use this class to update the character
                let classLevels = this.props.classes[className]['Levels'];
                if(numLevels > classLevels.length){
                    if(confirm(className + " only has data up to level " + classLevels.length
                            + "\nClick OK to update the character to level " + classLevels.length + " " + className
                            + "(You will have to adjust for subsequent " + className + " levels manually)") ){
                        numLevels = classLevels.length;
                    } else { return }
                }
                for(let i = 0; i < numLevels; i++)
                    updates.skillRanks.push(this.props.classes[className]['Ranks']);
                this.props.classes[className]['Skills'].map((skillName)=>{
                    if(!updates.skills.includes(skillName)) updates.skills.push(skillName);
                });
                let curLevel = classLevels[numLevels - 1];
                if(curLevel) { // level is defined, so we can make calculations
                    updates.bab += curLevel['BAB']; updates.fort += curLevel['Fort'];
                    updates.ref += curLevel['Ref']; updates.will += curLevel['Will'];
                }
            } else { // we can't use this class to update the character. Maybe send an alert?
                alert("No class information for " + className + ". This class will not be used to update the character.")
            }
            updates.hd += numLevels; // increment hd
        });
        this.props.updateCharacter('multiple', updates);
    },
    remove(e) {
        let className = e.target.name? e.target.name : e.target.dataset.name;
        if(confirm("Are you sure you want to remove all " + className + " levels from this character?"))
            this.props.remove(className)
    },
    setInfo(e) {
        this.setState({info: e.target.dataset.name});
    },
    addClass(e) {
        let className = e.target.name? e.target.name : e.target.dataset.name;
        if(!className || this.props.classLevels[className]) return;
        this.props.update(className, 1);
    },
    render() {
        let classLevels = this.props.classLevels;
        let classNames = Object.keys(classLevels);
        return (
            <span className="" style={{marginLeft: 10}}>
                <div className="flex-container flex-wrap" style={{borderBottomWidth: 2, borderBottomStyle: "solid"}}>
                    {classNames.map((className, index)=>{
                        return (
                            <div className="flex-item">
                                <a onClick={this.setInfo} data-name={className}
                                          title={"Show " + className + " Reference"} data-toggle="modal"
                                          data-target="#classReference">
                                    <b data-name={className}>{className}:</b>
                                </a>
                                {classLevels[className]}
                                {classNames[index+1]? <span>;&nbsp;</span>:""}
                            </div>
                        )
                    }, this)}
                    &nbsp;&nbsp;
                    {classNames.length
                        ?   <div aria-described-by="class-levels">
                                <button data-toggle="modal" data-target="#classManager" title="Edit Classes"
                                    className="btn btn-xs btn-primary">
                                    <span className="glyphicon glyphicon-pencil"/>
                                </button>
                                <button onClick={this.updateStats} title="Update Character"
                                    className="btn btn-xs btn-success">
                                    <span className="glyphicon glyphicon-user"/>
                                    <span className="glyphicon glyphicon-refresh"/>
                                </button>
                            </div>
                        :   <div aria-described-by="class-levels">
                                <button data-toggle="modal" data-target="#classManager" title="Add Classes"
                                    className="btn btn-xs btn-success">
                                    Add Classes
                                </button>
                            </div>
                    }
                </div>
                <span id="class-levels" className="help-block">Class Levels</span>
                <Manager managerName="classManager" labelName="Class" dbObjects={this.props.classes}
                    objects={this.props.classLevels} update={this.update} remove={this.remove} add={this.addClass}/>
                <Reference referenceName="classReference" labelName="Class" dbObjects={this.props.classes}
                    info={this.state.info}/>
            </span>
        );
    }

});

export default Classes;