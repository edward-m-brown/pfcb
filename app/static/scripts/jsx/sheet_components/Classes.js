/**
 * Created by edward on 4/3/17.
 */
import Manager from '../base_components/Manager'
var Classes = React.createClass({
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
            return
        let hd = 0;
        let bab = 0;
        let skillRanks = 0;
        let classSkills = [];
        Object.keys(this.props.classLevels).map((className)=>{
            let classNames = Object.keys(this.props.classes);
            if(classNames.includes(className)) { // we can use this class to update the character
                let levels = this.props.classes[className]['Levels'];
                let num_levels = 0 + this.props.classLevels[className];
                let cur_level = levels[num_levels - 1];
                if(cur_level) { // level is defined, so we can make calculations
                    bab += cur_level['BAB'];
                } else{ // level is not defined. Possibly greater than the amount of levels we have for the class?

                }
            } else { // we can't use this class to update the character. Maybe send an alert?
                console.log("No class information for " + className)
            }
            hd += this.props.classLevels[className]; // increment hd
        });
    },
    remove(e) {
        let className = e.target.name? e.target.name : e.target.dataset.name;
        if(confirm("Are you sure you want to remove all " + className + " levels from this character?"))
            this.props.remove(className)
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
                                <span className="glyphicon glyphicon-pencil"></span>
                            </button>
                            <button onClick={this.updateStats} title="Update Character">
                                <span className="glyphicon glyphicon-user"></span>
                                <span className="glyphicon glyphicon-refresh"></span>
                            </button>
                        </div>
                    :   <div>
                            <button data-toggle="modal" data-target="#classManager" title="Add Classes">
                                <span className="glyphicon glyphicon-plus-sign"></span>
                            </button>
                        </div>
                }

                <Manager managerName="classManager" labelName="Class" dbObjects={this.props.classes}
                     objects={this.props.classLevels} update={this.update} remove={this.remove} add={this.addClass}/>
            </div>
        );
    }

});

export default Classes;