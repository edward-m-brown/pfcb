/**
 * Created by edward on 4/3/17.
 */
import Manager from '../base_components/Manager'
import Reference from '../base_components/Reference'
var Classes = React.createClass({
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
            hd : 0, fort : 0, ref : 0, will : 0, bab : 0, skillRanks : 0, skills: []
        };
        let classNames = Object.keys(this.props.classes);
        Object.keys(this.props.classLevels).map((className)=>{
            let numLevels = this.props.classLevels[className];
            if(classNames.includes(className)) { // we can use this class to update the character
                let classLevels = this.props.classes[className]['Levels'];
                updates.skillRanks += numLevels * this.props.classes[className]['Ranks'];
                this.props.classes[className]['Skills'].map((skillName)=>{
                    if(!updates.skills.includes(skillName)) updates.skills.push(skillName);
                });
                let curLevel = classLevels[numLevels - 1];
                if(curLevel) { // level is defined, so we can make calculations
                    updates.bab += curLevel['BAB']; updates.fort += curLevel['Fort'];
                    updates.ref += curLevel['Ref']; updates.will += curLevel['Will'];
                } else{ // level is not defined. Possibly greater than the amount of levels we have for the class?
                    console.log("Failed to check undefined level "+ numLevels + " for class " + className);
                }
            } else { // we can't use this class to update the character. Maybe send an alert?
                console.log("No class information for " + className)
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
        this.setState({info: e.target.dataset.name})
    },
    addClass(e) {
        let className = e.target.name? e.target.name : e.target.dataset.name;
        if(!className) return;
        this.props.update(className, 1);
    },
    render() {
        let classLevels = this.props.classLevels;
        let classNames = Object.keys(classLevels);
        return (
            <div className="col-xs-6">
                <div className="flex-container flex-wrap">
                    {classNames.map((className, index)=>{
                        return (
                            <div className="flex-item">
                                {className}: {classLevels[className]}
                                {classNames[index+1]? ";":""}
                            </div>
                        )
                    }, this)}
                </div>
                {classNames.length
                    ?   <div>
                            <button data-toggle="modal" data-target="#classManager" title="Edit Classes">
                                <span className="glyphicon glyphicon-pencil"/>
                            </button>
                            <button onClick={this.updateStats} title="Update Character">
                                <span className="glyphicon glyphicon-user"/>
                                <span className="glyphicon glyphicon-refresh"/>
                            </button>
                        </div>
                    :   <div>
                            <button data-toggle="modal" data-target="#classManager" title="Add Classes">
                                <span className="glyphicon glyphicon-plus-sign"/>
                            </button>
                        </div>
                }

                <Manager managerName="classManager" labelName="Class" dbObjects={this.props.classes}
                     objects={this.props.classLevels} update={this.update} remove={this.remove} add={this.addClass}/>
                 <Reference referenceName="classReference" labelName="Class" dbObjects={this.props.classes}
                    info={this.state.info}/>
            </div>
        );
    }

});

export default Classes;