/**
 * Created by edward on 4/8/17.
 */
var $=require('jquery');
const Status = React.createClass({
    getInitialState() {
        return {
            static_HP: true,
            static_DR: true
        }
    },
    update(e) {
        let value = e.target.value;
        if(e.target.type == 'number') {
            let e_val = parseInt(value);
            value = e_val && e_val > 0? e_val: 0;
        }
        this.props.updateCharacter('status', value, e.target.name,
            e.target.dataset ? e.target.dataset.name: null);
    },
    updateDR(e) {

    },
    render() {
        let dr = this.props.status['DR'];
        let drKeys = Object.keys(dr);
        return (
            <div className="bordered col-xs-12 col-md-3">
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
                        {/* DR section needs work. Maybe launch a Manager for DR?*/}
                        <div className="flex-item" aria-describedby="DR">
                            <span id="DR" className="help-block" style={{textAlign: "left"}}>DR</span>
                            {drKeys.map((overcomeBy)=>{
                                return (
                                    <div>
                                        <text>{overcomeBy}</text>
                                        /
                                        <input type="number" value={dr[overcomeBy]} onChange={this.update}
                                            name="DR" data-name={overcomeBy}/>
                                    </div>
                                )
                            }, this)}
                            {drKeys.length
                                ? ''
                                : <button>
                                    <span className="glyphicon glyphicon-plus-sign"></span>
                                  </button>}
                            <button onClick={()=>{this.setState({static_DR: !this.state.static_DR})}}
                                    title={this.state.static_DR? "Edit DR": "Save DR"}>
                                {this.state.static_DR
                                    ? <span className="glyphicon glyphicon-pencil"></span>
                                    :<span className="glyphicon glyphicon-floppy-save"></span>}

                            </button>
                        </div>
                    </div>
                    <div className="flex-item">MORE STATUS HERE</div>
                </div>
            </div>
        );
    }
});

export default Status;

