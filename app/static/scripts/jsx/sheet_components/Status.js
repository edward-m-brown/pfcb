/**
 * Created by edward on 4/8/17.
 */

const Status = React.createClass({
    getInitialState() {
        let initialStatus = this.computeStatus(this.props.status);
        return {
            edit_HP: false,
            adjustment: 0,
            total_HP: this.props.status['HP'] + (this.props.conMod * this.props.characterLevel),
            color: initialStatus.color,
            status: initialStatus.status
        }
    },
    componentWillReceiveProps(nextProps) {
        let nextStatus = nextProps.status;
        let status = this.computeStatus(nextStatus);
        this.setState({color: status.color, status: status.status})
    },
    computeStatus(nextStatus) {
        if(!nextStatus) return {color: 'transparent', status:''}
        let nextCurrent = nextStatus['Current'];
        let nextHP = nextStatus['HP'] + (this.props.conMod * this.props.characterLevel);
        let minusNonlethal = nextCurrent - nextStatus['Nonlethal'];
        let color, status, image;
        if(minusNonlethal >= nextHP) {color = "green"; status="Full HP"}
        else if(minusNonlethal < nextHP && minusNonlethal >= (nextHP/2)) {color = "yellowgreen"; status = "Some Damage"}
        else if(minusNonlethal < (nextHP/2) && minusNonlethal > 0) {color = "gold"; status = "Heavy Damage"}
        else if(nextStatus['Nonlethal'] && minusNonlethal == 0 ) {color = "orange"; status = "Staggered"}
        else if((minusNonlethal < 0 || nextCurrent <= 0) && nextCurrent > -this.props.conScore)
        {color = "orangered"; status = "Unconscious"}
        else {color = "darkred"; status = "Dead"}
        return({color: color, status: status});
    },
    update(e) {
        let value = e.target.value;
        if(e.target.type == 'number') {
            value = parseInt(value);
        }
        this.props.updateCharacter('status', value, e.target.name,
            e.target.dataset ? e.target.dataset.name: null);
    },
    updateAdjustment(e) {
        let value = parseInt(e.target.value);
        this.setState({adjustment: value || value >= 0? value: 0});
    },
    heal() {
        let adj = this.state.adjustment? this.state.adjustment : 0;
        this.props.updateCharacter('status', this.props.status['Current'] + adj, 'Current');
    },
    damage(){
        let adj = this.state.adjustment? this.state.adjustment : 0;
        this.props.updateCharacter('status', this.props.status['Current'] - adj, 'Current');
    },
    render() {
        let dr = this.props.status['DR'];
        let hp = this.props.status['HP'];
        let current = this.props.status['Current'];
        let conBonus = this.props.conMod * this.props.characterLevel;
        let tmp = this.props.status['Temp'];
        let nonlethal = this.props.status['Nonlethal'];
        return (
            <div className="bordered col-xs-12 status" title={this.state.status} style={{backgroundColor: this.state.color}}>
                {/*<h2 style={{textAlign: "center"}}>Status</h2>*/}
                <div className="flex-container-col">
                    <div className="flex-item flex-container">
                        <span className="field-block flex-item" aria-describedby="HP">
                            <ul className="list-unstyled">
                                <li>HP</li>
                                <li><sup>Hit Points</sup></li>
                            </ul>
                        </span>
                        <div className="flex-item">
                            <span id="Total" className="help-block" style={{textAlign: "left"}}>
                                <sub>{this.state.edit_HP? "Base HP": "Total HP"}</sub>
                            </span>
                            <input type="number" name="HP" value={this.state.edit_HP? hp: hp + conBonus}
                                onChange={this.update} disabled={!this.state.edit_HP} style={{width: 60}}
                                aria-describedby="Total" className={this.state.edit_HP? "": "add-static"}/>
                            <button onClick={()=>{this.setState({edit_HP: !this.state.edit_HP})}}
                                title={this.state.edit_HP? "Save HP": "Edit HP"}>
                                {this.state.edit_HP
                                    ? <span className="glyphicon glyphicon-floppy-save"/>
                                    :<span className="glyphicon glyphicon-pencil"/>}
                            </button>
                        </div>
                        &nbsp;&nbsp;
                        {/*TODO:  DR section needs work. Maybe launch a Manager for DR*/}
                        <div className="flex-item" aria-describedby="DR">
                            <span id="DR" className="help-block" style={{textAlign: "left"}}><sub>DR</sub></span>
                            <input type="text" name="DR" value={dr} onChange={this.update} className="medium flex-item"/>
                        </div>
                    </div>
                    <div className="flex-item flex-container justify-center flex-wrap">
                        <div className="">
                            <span id="Current" className="help-block" style={{textAlign: "left"}}>
                                <sub>Current HP</sub>
                            </span>
                            <input type="number" name="Current" value={current} aria-describedby="Current"
                                onChange={this.update} style={{width: 60}}/>
                        </div>
                        &nbsp;&nbsp;
                        <div className="">
                            <span id="Adjustment" className="help-block" style={{textAlign: "left"}}>
                                <sub>Adjustment</sub>
                            </span>
                            <input type="number" value={this.state.adjustment} aria-describedby="Adjustment"
                                onChange={this.updateAdjustment} style={{width: 60}}/>
                        </div>
                        <div className="flex-container-col">
                            <button onClick={this.heal} title="Heal">
                                <span className="glyphicon glyphicon-plus" style={{fontSize: "x-small"}}/>
                            </button>
                            <button onClick={this.damage} title="Damage">
                                <span className="glyphicon glyphicon-minus" style={{fontSize: "x-small"}}/>
                            </button>
                        </div>
                    </div>
                    <div className="">
                        <span id="Nonlethal" className="help-block" style={{textAlign: "left"}}><sub>Nonlethal</sub></span>
                        <input type="number" name="Nonlethal" value={nonlethal} onChange={this.update}
                            style={{width: 60}}/>
                    </div>
                </div>
            </div>
        );
    }
});

export default Status;

