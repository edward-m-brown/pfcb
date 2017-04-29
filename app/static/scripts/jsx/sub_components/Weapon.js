/**
 * Created by edward on 4/29/17.
 */
import AddBoxes from '../base_components/AddBoxes'

const Weapon = React.createClass({
    getInitialState() {
        return {increment: 0, edit: false}
    },
    incrementRange(e) {
        this.setState({
            increment: parseInt(e.target.value)
        });
    },
    makeBoxes(boxType, weapon, index) {
        let boxes = {
            name: weapon.name, enhancement: {
                value: weapon.enhancement, change: this.props.updateWeapon
            }};
        let array;
        if(boxType == 'attack') {
            boxes['miscAttack'] = {value: weapon.miscAttack, change: this.props.updateWeapon};
            array = weapon.attack;
            if(weapon.range){
                boxes['Range Penalty'] = {
                    value: -2 * this.state.increment
                }
            }
        } else {
            boxes['miscDamage'] = {value: weapon.miscDamage, change: this.updateWeapon};
            array = weapon.damageBonus;
        }
        for(let item in array) {
            boxes[array[item]] = {value: this.props[array[item]]};
        }
        return boxes;
    },
    makeIncrementList(range) {
        let incrementList = [];
        for(let i=1; i<=10; i++)
            incrementList.push(i*range);
        return incrementList;
    },
    toggleEdit() {
        this.setState({edit: !this.state.edit});
    },
    render() {
        let index = this.props.index;
        let weapon = this.props.weapon;
        let attackBonus = this.makeBoxes('attack', this.props.weapon, this.props.index);
        let damageBonus = this.makeBoxes('damage', this.props.weapon, this.props.index);
        let editTitle = this.state.edit? "Save Weapon": "Edit Weapon";
        let editIcon = this.state.edit? "glyphicon glyphicon-floppy-save": "glyphicon glyphicon-pencil";
        return(
            <div className="flex-container-col bordered">
                <div className="flex-container flex-item flex-wrap" style={{textAlign: "center"}}>
                    {/* name, attack, critical, critMultiplier*/}
                    <div className="flex-item weapon-field">
                        <span id={"weapon-"+index+"-name"} className="help-block flex-item">
                            <h4 className="field-block">Weapon</h4>
                        </span>
                        <button title={editTitle} onClick={this.toggleEdit}>
                            <span className={editIcon}/>
                        </button>
                        <input type="text" data-index={index} data-name="name" value={weapon.name}
                               onChange={this.props.update} aria-describedby={"weapon-"+index+"-name"}/>
                    </div>
                    <div className="flex-item weapon-field" style={{textAlign: "center"}}>
                        <span id={"weapon-"+index+"-attack"} className="help-block flex-item"
                            style={{marginTop: 15}}>
                            <h6 className="field-block">Attack Bonus</h6>
                        </span>
                        <div className="flex-item flex-container-col">
                        <AddBoxes boxes={attackBonus} index={index}
                            totalOnly={!this.state.edit} describedBy={"weapon-"+index+"-attack"}/>
                        </div>
                        {this.state.edit? "Stuff for adding/subtracting fields goes here": "Additional attack bonus logic goes here"}
                    </div>
                    <div className="flex-item weapon-field">
                                       <span id={"weapon-"+index+"-critical"} className="help-block flex-item"
                                             style={{marginTop: 15}}>
                                           <h6 className="field-block">Critical</h6>
                                       </span>
                        <div className="flex-item flex-container">
                            <span className="flex-item">
                               <input value={weapon.critical} disabled={!this.state.edit}
                                   style={this.state.edit? {width:35}:{width: 20}}
                                   aria-describedby={"weapon-"+index+"-critical"}/>
                                {weapon.critical < 20? <span>&ndash;20</span>: ''}
                             </span>
                            <span className="flex-item">
                                               <sub>X</sub>
                                           </span>
                            <input value={weapon.critMultiplier} disabled={!this.state.edit}
                                style={{width: 20}}
                                aria-describedby={"weapon-"+index+"-critical"} className="small-item"/>
                        </div>

                    </div>
                </div>
                <div className="flex-container flex-item flex-wrap" style={{textAlign: "center"}}>
                    <div className="flex-item weapon-field">
                        <span id={"weapon-"+index+"-type"} className="help-block flex-item">
                            <h6 className="field-block">Type</h6>
                        </span>
                    </div>
                    <div className="flex-item weapon-field">
                                        <span id={"weapon-"+index+"-range"} className="help-block flex-item">
                                           <h6 className="field-block">Range</h6>
                                       </span>
                        {weapon.range
                            ? this.state.edit? '': <div className="flex-item" aria-describedy={"weapon-"+index+"-range"}>
                                <select defaultValue="0" onChange={this.incrementRange} data-index={index}>
                                    {this.makeIncrementList(weapon.range).map((increment, incIndex)=>{
                                        return <option value={incIndex}>{increment}</option>
                                    })}
                                </select>
                                ft.
                              </div>
                            : <span aria-describedy={"weapon-"+index+"-range"} className="flex-item">
                                               &ndash;
                             </span>}
                        {this.state.edit
                            ? <input type="number" data-name="range" data-index={index} value={weapon.range}
                                  onChange={this.props.update}
                                  aria-describedby={"weapon-"+index+"-range"}/>
                            : ''
                        }
                    </div>
                    <div className="flex-item weapon-field">
                        <span id={"weapon-"+index+"-ammunition"} className="help-block flex-item">
                           <h6 className="field-block">Ammunition</h6>
                        </span>
                        <div className="flex-item"
                             aria-describedby={"weapon-"+index+"-ammunition"}>
                            <input type="number" value={weapon.ammunition} data-index={index} data-name="ammunition"
                                onChange={this.props.update}/>
                        </div>

                    </div>
                    <div className="flex-item weapon-field">
                        <span id={"weapon-"+index+"-damage"} className="help-block flex-item">
                            <h6 className="field-block">Damage</h6>
                        </span>
                        <AddBoxes boxes={damageBonus} index={index}
                            totalOnly={!this.state.edit} describedBy={"weapon-"+index+"-damage"}/>
                    </div>
                </div>
            </div>
        )
    }
});
export default Weapon;