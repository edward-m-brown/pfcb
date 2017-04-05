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
    remove(e) {
        let className = e.target.name;
        if(confirm("Are you sure you want to remove all " + className + " levels from this character?"))
            this.props.remove(className)
    },
    addClass(e) {
        console.log(e.target)
    },
    render() {
        let classLevels = this.props.classLevels;
        let classNames = Object.keys(classLevels);
        return (
            <div className="flex-container justify-start">
                {classNames.map((className, index)=>{
                    return (
                        <label className="flex-item small-item">
                            {className}: {classLevels[className]}
                            {classNames[index+1]? ";":""}
                        </label>
                    )
                }, this)}
                <label className="flex-item small-item">
                    <button data-toggle="modal" data-target="#classManager">Manage Classes</button>
                </label>
                <Manager managerName="classManager" labelName="Classes" dbObjects={this.props.classes}
                     objects={this.props.classLevels} update={this.update} remove={this.remove} add={this.addClass}/>
            </div>
        );
    }

});

export default Classes;