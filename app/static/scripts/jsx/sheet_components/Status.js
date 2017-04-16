/**
 * Created by edward on 4/8/17.
 */
const Status = React.createClass({
    getInitialState() {
        return {
            static_HP: true,
            adjustment: 0,
            color: 'transparent'
        }
    },
    update(e) {
        let value = e.target.value;
        if(e.target.type == 'number') {
            let e_val = parseInt(value);
            value = e_val;
        }
        this.props.updateCharacter('status', value, e.target.name);
    },
    updateAdjustment(e) {
        let value = parseInt(e.target.value);
        this.setState({adjustment: value && value >= 0? value: ''});
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
        let drKeys = Object.keys(dr);
        let hp = this.props.status['HP'];
        let current = this.props.status['Current'];
        let tmp = this.props.status['Temp'];
        let nonlethal = this.props.status['Nonlethal'];
        return (
            <div className="bordered" title={this.state.status} style={{backgroundColor: this.state.color}}>
                <h2 style={{textAlign: "center"}}>Status</h2>
                <div className="flex-container-col">
                    <div className="flex-item flex-container bg-none">
                        <div className="flex-item"></div>
                        <span className="flex-item field-block" aria-describedby="HP">
                            <ul className="list-unstyled">
                                <li>HP</li>
                                <li><sub>Hit Points</sub></li>
                            </ul>
                        </span>
                        <div className="flex-item">
                            <span id="Total" className="help-block" style={{textAlign: "left"}}>Total</span>
                            <input type="number" name="HP" value={hp} onChange={this.update}
                                disabled={this.state.static_HP} style={{width: 60}} aria-describedby="Total"/>
                            <button onClick={()=>{this.setState({static_HP: !this.state.static_HP})}}
                                    title={this.state.static_HP? "Edit HP": "Save HP"}>
                                {this.state.static_HP
                                    ? <span className="glyphicon glyphicon-pencil"></span>
                                    :<span className="glyphicon glyphicon-floppy-save"></span>}
                            </button>
                        </div>
                        <div className="flex-item" aria-describedby="DR">
                            <span id="DR" className="help-block" style={{textAlign: "left"}}>DR</span>
                            {/* actual code for editing DR here */}
                            <button onClick={()=>{this.setState({static_HP: !this.state.static_HP})}}
                                    title={this.state.static_HP? "Edit DR": "Save DR"}>
                                {this.state.static_HP
                                    ? <span className="glyphicon glyphicon-pencil"></span>
                                    :<span className="glyphicon glyphicon-floppy-save"></span>}
                            </button>
                        </div>
                    </div>
                    <div className="flex-item flex-container">
                        <div className="flex-item"></div>
                        <div className="flex-item"></div>
                        <div className="flex-item">
                            <span id="Current" className="help-block" style={{textAlign: "left"}}>Current HP</span>
                            <input type="number" name="Current" value={current} aria-describedby="Current"
                                onChange={this.update} style={{width: 60}}/>
                        </div>
                        <div className="flex-item">
                            <span id="Adjustment" className="help-block" style={{textAlign: "left"}}>Adjustment</span>
                            <input type="number" value={this.state.adjustment} aria-describedby="Adjustment"
                                onChange={this.updateAdjustment} style={{width: 60}}/>
                        </div>
                        <div className=" flex-item flex-container-col">
                            <button onClick={this.heal} className="flex-item" title="Heal">
                                <span className="glyphicon glyphicon-plus"></span>
                            </button>
                            <button onClick={this.damage} className="flex-item" title="Damage">
                                <span className="glyphicon glyphicon-minus"></span>
                            </button>
                        </div>
                        <div className="flex-item"></div>
                        <div className="flex-item"></div>
                    </div>
                    <div className="flex-item">
                        <span id="Nonlethal" className="help-block" style={{textAlign: "left"}}>Nonlethal</span>
                        <input type="number" name="Nonlethal" value={nonlethal} onChange={this.update}/>
                    </div>
                </div>
            </div>
        );
    }
});

export default Status;

