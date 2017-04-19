/**
 * Created by edward on 4/8/17.
 */

const Movement = React.createClass({
    update(e) {
        let value = e.target.value;
        if(e.target.type == 'number') {
            let e_val = parseInt(value);
            value = e_val && e_val > 0? e_val: 30;
        }
        this.props.updateCharacter('movement', value, e.target.name);
    },
    movementField(moveType) {
        return (
            <div className="">
                <input className="flex-item" aria-describedby={moveType}
                       type="number" value={this.props.movement[moveType]}
                       name={moveType} style={{width: 40}} onChange={this.update}/>
                <span className="flex-item"><sub>FT.</sub>&nbsp;&nbsp;</span>
                {moveType == 'Base Speed' || moveType == 'With Armor'
                    ? <span className="flex-item">
                        <text style={{textDecoration: "underline"}}>{Math.floor(this.props.movement[moveType]/5)}</text>
                        &nbsp;<sub>SQ.</sub>&nbsp;
                      </span>
                    : ''}
                <span id={moveType} className="help-block">{moveType}</span>
            </div>
        );
    },
    render(){
        return (
            <div className="flex-container-col col-xs-12 col-md-3 bordered">
                <h2 className="col-md-12" style={{textAlign: "center"}}>Movement</h2>
                <div className="flex-item flex-container flex-wrap">
                    <ul className="list-unstyled field-block small-item">
                        <li>Speed</li>
                        <li><sup>Land</sup></li>
                    </ul>
                    &nbsp;&nbsp;
                    {["Base Speed", "With Armor"].map((moveType)=>{
                        return this.movementField(moveType);
                    }, this)}
                </div>
                <div className="flex-item flex-container flex-wrap">
                    {["Fly", "Swim", "Climb", "Burrow"].map((moveType)=>{
                        return this.movementField(moveType)
                    },this)}
                </div>
                <textarea className="flex-item" value={this.props.movement['Temp Modifiers']} style={{resize: "none"}}
                       onChange={this.update} name="Temp Modifiers" aria-describedby="Temp"/>
                <span id="Temp" className="help-block">Temp Modifiers</span>
            </div>
        )
    }
});

export default Movement;