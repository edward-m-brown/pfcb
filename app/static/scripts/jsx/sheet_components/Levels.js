import Classes from './Classes'
var Levels = React.createClass({
    updateExp(event) {
        let value = parseInt(event.target.value);
        this.props.updateCharacter('exp', value && value > 0? value: 0);
    },
    updateClassLevels(className, value) {
        this.props.updateCharacter('class_levels', value, className);
    },
    removeClass(className) {
        this.props.updateCharacter('remove_class', className)
    },
    render(){
        return (
            <div className="col-xs-12 bordered">
                <h2 style={{textAlign: "center"}}> Character Levels </h2>
                <Classes classes={this.props.classes} classLevels={this.props.levels['Class_Levels']}
                    update={this.updateClassLevels} remove={this.removeClass}/>
                <label className="col-xs-6">
                   XP:
                   <input type="number" value={this.props.levels['Exp']} onChange={this.updateExp}/>
                </label>
            </div>
        )
    }
});

export default Levels;