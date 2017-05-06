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
        let className = "flex-container bordered " + this.props.className;
        return (
            <div className={className} aria-describedby={this.props.describedBy}>
                <Classes classes={this.props.classes} classLevels={this.props.levels['Class_Levels']}
                    update={this.updateClassLevels} remove={this.removeClass}
                    updateCharacter={this.props.updateCharacter}/>
                <div>
                    <input type="number" value={this.props.levels['Exp']} onChange={this.updateExp}
                        aria-describedby="experience"/>
                    <span id="experience" className="help-block">Experience Points</span>
                </div>

            </div>
        )
    }
});

export default Levels;