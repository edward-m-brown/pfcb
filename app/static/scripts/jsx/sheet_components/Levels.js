import Classes from './Classes'
const exp_table = {
    'slow': {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0

    }, 'medium': {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0

    }, 'fast': {
        1: 0,
        2: 1300,
        3: 3300,
        4: 6000,
        5: 10000,
        6: 15000,
        7: 23000,
        8: 34000,
        9: 50000,
        10: 71000,
        11: 105000,
        12: 145000,
        13: 210000,
        14: 295000,
        15: 425000,
        16: 600000,
        17: 850000,
        18: 1200000,
        19: 1700000,
        20: 2400000
    }

};
const Levels = React.createClass({
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
        let className = "flex-container " + this.props.className;
        return (
            <div className={className} style={{borderBottom: 2}}>
                <Classes classes={this.props.classes} classLevels={this.props.levels['Class_Levels']}
                    update={this.updateClassLevels} remove={this.removeClass}
                    updateCharacter={this.props.updateCharacter}/>
                <div className="description-field">
                    <input type="number" value={this.props.levels['Exp']} onChange={this.updateExp}
                        aria-describedby="experience"/>
                    <span id="experience" className="help-block">Experience Points</span>
                </div>
                    {exp_table['fast'][this.props.characterLevel+1]
                        ? <div className="description-field">
                            <input type="number" disabled={true} aria-describedby="next-level"
                                   value={exp_table['fast'][this.props.characterLevel+1]}/>
                            <span id="next-level" className="help-block">Next Level</span>
                          </div>
                        : <div className="description-field">
                            <input type="text" disabled={true} aria-describedby="next-level"
                                   value="--"/>
                            <span id="next-level" className="help-block">Next Level</span>
                          </div>}
            </div>
        )
    }
});

export default Levels;