/**
 * Created by edward on 4/29/17.
 */
import AddBoxes from '../base_components/AddBoxes'
const $=require('../../../bower_components/jquery/dist/jquery.min')

const Weapon = React.createClass({
    getInitialState() {
        return {
            increment: 0,
            edit: false
        }
    },
    addSubFields(bonusType, weapon, index) {
        let able = {add: [], sub:[]};
        ["strMod", "dexMod", "conMod", "intMod", "wisMod", "chaMod"].map((mod)=>{
            if(weapon[bonusType].includes(mod))
                able.sub.push(mod);
            else
                able.add.push(mod);
        });
        return (
            <span>
                <label>Add Modifier: </label>&nbsp;
                <select data-name={bonusType} data-index={index} onChange={this.props.update} onClick={this.props.update}>
                    {able.add.map((modName)=>{
                        return <option value={modName}>
                                   {modName.split('M')[0].toUpperCase()} M{modName.split('M')[1]}
                               </option>
                    })}
                </select>
                &nbsp;
                <label>Remove Modifier: </label>&nbsp;
                <select data-name={bonusType} data-index={index} onChange={this.props.update} onClick={this.props.update}>
                    {able.sub.map((modName)=>{
                        return <option value={modName}>
                            {modName.split('M')[0].toUpperCase()} M{modName.split('M')[1]}
                        </option>
                    })}
                </select>
            </span>
        );
    },
    computeMulti(attackBonus, index) {
        let curBAB = this.props.baseAttack;
        let multiAttack = [];
        let abCopy = $.extend(true,{}, attackBonus);
        while(curBAB > 5){
            curBAB -= 5;
            let newBonus = $.extend(true, {}, abCopy);
            newBonus.baseAttack.value = curBAB;
            multiAttack.push('+');
            multiAttack.push(
                <AddBoxes boxes={newBonus} index={index} className="text"
                    totalOnly={true} describedBy={"weapon-"+index+"-attack"}/>
            );
            if(curBAB > 5)
                multiAttack.push("/")
        }
        return multiAttack;
    },
    incrementRange(e) {
        this.setState({
            increment: parseInt(e.target.value)
        });
    },
    makeBoxes(boxType, weapon, index) {
        let boxes = {
            name: weapon.name, enhancement: {
                value: weapon.enhancement, change: this.props.update
            }};
        let array;
        if(boxType == 'attack') {
            boxes['miscAttack'] = {value: weapon.miscAttack, change: this.props.update};
            array = weapon.attack;
            if(weapon.range){
                boxes['Range Penalty'] = {
                    value: -2 * this.state.increment
                }
            }
        } else {
            boxes['miscDamage'] = {value: weapon.miscDamage, change: this.props.update};
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
                <div className="flex-container flex-wrap" style={{textAlign: "center"}}>
                    {/* name, attack, critical, critMultiplier*/}
                    <div className="weapon-field">
                        <span id={"weapon-"+index+"-name"} className="help-block flex-item">
                            <h4 className="field-block">Weapon</h4>
                        </span>
                        <button title={editTitle} onClick={this.toggleEdit}>
                            <span className={editIcon}/>
                        </button>
                        <input type="text" data-index={index} data-name="name" value={weapon.name}
                               onChange={this.props.update} aria-describedby={"weapon-"+index+"-name"}/>
                    </div>
                    <div className="weapon-field" style={{textAlign: "center"}}>
                        <span id={"weapon-"+index+"-attack"} className="help-block flex-item"
                            style={{marginTop: 15}}>
                            <h6 className="field-block">Attack Bonus</h6>
                        </span>
                        <div className="flex-container-col">
                            <span className="flex-container"
                                  style={{justifyContent: "center"}}>
                                {this.state.edit? "": "+"}
                                <AddBoxes boxes={attackBonus} index={index}
                                   totalOnly={!this.state.edit} describedBy={"weapon-"+index+"-attack"}/>
                            </span>
                            {this.state.edit
                                ? <span className="flex-container">{this.addSubFields("attack", weapon, index)}</span>
                                : <span className="flex-container">{this.computeMulti(attackBonus, index)}</span>}
                        </div>

                    </div>
                    <div className="weapon-field">
                                       <span id={"weapon-"+index+"-critical"} className="help-block"
                                             style={{marginTop: 15}}>
                                           <h6 className="field-block">Critical</h6>
                                       </span>
                        <div className="flex-container">
                            <span>
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
                    <div className="weapon-field">
                        <span id={"weapon-"+index+"-type"} className="help-block" style={{marginTop: 15}}>
                            <h6 className="field-block">Type</h6>
                        </span>
                        <input type="text" value={weapon.type} data-name="type" data-index={index}
                            onChange={this.props.update}/>
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
                            : this.state.edit? '': <span aria-describedy={"weapon-"+index+"-range"} className="flex-item">
                                               &ndash;
                             </span>}
                        {this.state.edit
                            ? <input type="number" data-name="range" data-index={index} value={weapon.range}
                                  onChange={this.props.update}
                                  aria-describedby={"weapon-"+index+"-range"}/>
                            : ''
                        }
                    </div>
                    <div className="weapon-field">
                        <span id={"weapon-"+index+"-ammunition"} className="help-block flex-item">
                           <h6 className="field-block">Ammunition</h6>
                        </span>
                        <div className="flex-item" aria-describedby={"weapon-"+index+"-ammunition"}
                            style={{textAlign: "center"}}>
                            <input type="number" value={weapon.ammunition} data-index={index} data-name="ammunition"
                                   onChange={this.props.update} className="ammunition"/>
                        </div>

                    </div>
                    <div className="weapon-field">
                        <span id={"weapon-"+index+"-damage"} className="help-block flex-item">
                            <h6 className="field-block">Damage</h6>
                        </span>
                        <AddBoxes boxes={damageBonus} index={index}
                            totalOnly={!this.state.edit} describedBy={"weapon-"+index+"-damage"}/>
                    </div>
                </div>
                <div className="weapon-field">
                    <span id={"weapon-"+index+"-damage"} className="help-block flex-item">
                        <h6 className="field-block">Notes</h6>
                    </span>
                    <textarea value={weapon.notes} onChange={this.props.update} data-name="notes" data-index={index}
                        className="weapon-notes"/>
                </div>
            </div>
        )
    }
});
export default Weapon;