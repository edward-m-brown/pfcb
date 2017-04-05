import Classes from './Classes'
var Levels = React.createClass({
    updateExp(event) {
        let value = parseInt(event.target.value);
        this.props.updateExp( value && value > 0? value: 0 );
    },
    updateCharacterLevel(classLevels) {

    },
    render(){
        return (
            <div className="flex-container">
                <div className="flex-item">
                   <Classes classes={this.props.classes} classLevels={this.props.levels['Class_Levels']}
                        update={this.props.updateClassLevels} remove={this.props.removeClass}/>
                </div>
                <label className="flex-item">
                   Experience Points
                   <input type="number" value={this.props.levels['Exp']} onChange={this.updateExp}/>
                </label>
            </div>
        )
    }
});

export default Levels;