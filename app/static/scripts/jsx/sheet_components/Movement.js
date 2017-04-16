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
                <span id={moveType} className="help-block">{moveType}</span>
                <input className="flex-item" aria-describedby={moveType}
                       type="number" value={this.props.movement[moveType]}
                       name={moveType} style={{width: 50}} onChange={this.update}/>FT.
                {moveType == 'Base Speed' || moveType == 'With Armor'
                    ? <text className="flex-item">{Math.floor(this.props.movement[moveType]/5)} SQ.</text>
                    : ''}
            </div>
        );
    },
    render(){
        return (
            <div className="flex-container-col col-xs-12 col-md-3 bordered">
                <h2 className="col-md-12" style={{textAlign: "center"}}>Movement</h2>
                <div className="flex-item flex-container flex-wrap bg-none">
                    {["Base Speed", "With Armor"].map((moveType)=>{
                        return this.movementField(moveType);
                    }, this)}
                </div>
                <div className="flex-item flex-container flex-wrap bg-none">
                    {["Fly", "Swim", "Climb", "Burrow"].map((moveType)=>{
                        return this.movementField(moveType)
                    },this)}
                </div>
                <textarea className="flex-item bg-none" value={this.props.movement['Temp Modifiers']}
                       onChange={this.update} name="Temp Modifiers" aria-describedby="Temp"/>
                <span id="Temp" className="help-block">Temp Modifiers</span>
            </div>
        )
    }
});

export default Movement;