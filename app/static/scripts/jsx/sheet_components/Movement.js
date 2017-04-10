/**
 * Created by edward on 4/8/17.
 */

const movementField = (moveType, that)=> {
    return (
        <div className="">
            <span id={moveType} className="help-block">{moveType}</span>
            <input className="flex-item" aria-describedby={moveType}
                   type="number" value={that.props.movement[moveType]}
                   name={moveType} style={{width: 50}} onChange={that.update}/>FT.
            {moveType == 'Base Speed' || moveType == 'With Armor'
                ? <text className="flex-item">{Math.floor(that.props.movement[moveType]/5)} SQ.</text>
                : ''}
        </div>
    );
}
const Movement = React.createClass({
    update(e) {
        let e_val = parseInt(e.target.value);
        let value = e_val && e_val > 0? e_val: 30;
        this.props.updateCharacter('movement', value, e.target.name);
    },
    render(){
        return (
            <div className="flex-container-col col-xs-12">
                <h2 className="col-md-12" style={{textAlign: "center"}}>Movement</h2>
                <div className="flex-container flex-wrap">
                    {["Base Speed", "With Armor"].map((moveType)=>{
                        return movementField(moveType, this);
                    }, this)}
                </div>
                <div className="flex-container flex-wrap">
                    {["Fly", "Swim", "Climb", "Burrow"].map((moveType)=>{
                        return movementField(moveType, this)
                    },this)}
                </div>
            </div>
        )
    }
});

export default Movement;