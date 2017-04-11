/**
 * Created by edward on 4/8/17.
 */
const Status = React.createClass({
    getInitialState() {
        return {
            static_HP: true
        }
    },
    update(e) {
        let value = e.target.value;
        if(e.target.type == 'number') {
            let e_val = parseInt(value);
            value = e_val && e_val > 0? e_val: 0;
        }
        this.props.updateCharacter('status', value, e.target.name);
    },
    render() {
        return (
            <div className="bordered">
                <h2 style={{textAlign: "center"}}>Status</h2>
                <div className="flex-container-col">
                    <div className="flex-item flex-container bg-none">
                        <span className="flex-item field-block" aria-describedby="HP">
                            <ul className="list-unstyled">
                                <li>HP</li>
                                <li><sub>Hit Points</sub></li>
                            </ul>
                        </span>
                        <div className="flex-item">
                            <span id="Total" className="help-block" style={{textAlign: "left"}}>Total</span>
                            <input type="number" name="HP" value={this.props.status['HP']} onChange={this.update}
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
                </div>
            </div>
        );
    }
});

export default Status;

