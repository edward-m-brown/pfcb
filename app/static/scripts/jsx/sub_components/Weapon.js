/**
 * Created by edward on 4/29/17.
 */
import AddBoxes from '../base_components/AddBoxes'
const $=require('../../../bower_components/jquery/dist/jquery.min')

const Weapon = React.createClass({
    getInitialState() {
        return {
            increment: 0,
            edit: false,
            add: '',
            remove: ''
        }
    },
    addRemove(e) {
        this.setState({[e.target.dataset.name]: e.target.value})
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
                {able.add.length
                    ?<span>
                        <select onChange={this.addRemove} data-name="add"
                            value={able.add.includes(this.state.add)? this.state.add: ""}>
                            <option value="">Select...</option>
                            {able.add.map((modName)=>{
                                return <option value={modName}>
                                    {modName.split('M')[0].toUpperCase()} M{modName.split('M')[1]}
                                </option>
                            })}
                        </select>
                        <button value={this.state.add} data-name={bonusType} data-index={index} onClick={this.props.update}
                                data-action="add">
                            Add
                        </button>
                     </span>
                    : ''
                }
                &nbsp;
                {able.sub.length
                    ? <span>
                        <select onChange={this.addRemove} data-name="remove"
                                value={able.sub.includes(this.state.remove) ? this.state.remove: ""}>
                            <option value="">Select...</option>
                            {able.sub.map((modName)=>{
                                return <option value={modName}>
                                    {modName.split('M')[0].toUpperCase()} M{modName.split('M')[1]}
                                </option>
                            })}
                        </select>
                        <button value={this.state.remove} data-name={bonusType} data-index={index} onClick={this.props.update}
                                data-action="remove">
                            Remove
                        </button>
                      </span>
                    : ''

                }
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
            boxes['baseAttack'] = {value: this.props.baseAttack}
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
                            <h4 className="field-block">
                                <button title={editTitle} onClick={this.toggleEdit}
                                    style={{color: "black", fontSize: "smaller"}}>
                                    <span className={editIcon}/>
                                </button>
                                &nbsp;&nbsp;
                                Weapon
                            </h4>
                        </span>
                        <input type="text" data-index={index} data-name="name" value={weapon.name} className="large"
                               onChange={this.props.update} aria-describedby={"weapon-"+index+"-name"}/>
                    </div>
                    <div className="weapon-field" style={{textAlign: "center"}}>
                        <span id={"weapon-"+index+"-attack"} className="help-block"
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
                    <div className="weapon-field flex-item">
                        <span id={"weapon-"+index+"-damage"} className="help-block" style={{marginTop: 15}}>
                            <h6 className="field-block">Damage</h6>
                        </span>
                        <span className="flex-container justify-center">
                                {this.state.edit
                                    ? <span>
                                          <input type="number" value={weapon.damage[0]} className="small"
                                              data-index={index} data-name="damage" data-nested="0"
                                              onChange={this.props.update} style={{width: 35}}/>
                                          D
                                          <input type="number" value={weapon.damage[1]} className="small"
                                              data-index={index} data-name="damage" data-nested="1"
                                              onChange={this.props.update} style={{width: 35}}/>
                                      </span>
                                    : <span>{weapon.damage[0]}d{weapon.damage[1]} + </span>
                                }
                            <span className="flex-container-col">
                                    <AddBoxes boxes={damageBonus} index={index}
                                              totalOnly={!this.state.edit} describedBy={"weapon-"+index+"-damage"}/>
                                {this.state.edit
                                    ? <span className="flex-container">
                                            {this.addSubFields("damageBonus", weapon, index)}
                                      </span>
                                    : ''}
                                </span>
                            </span>
                    </div>
                    <div className="weapon-field">
                       <span id={"weapon-"+index+"-critical"} className="help-block"
                             style={{marginTop: 15}}>
                           <h6 className="field-block">Critical</h6>
                       </span>
                        <div className="flex-container">
                            <span>
                               <input type="number" value={weapon.critical} disabled={!this.state.edit}
                                   className="critical" aria-describedby={"weapon-"+index+"-critical"}
                                   data-index={index} data-name="critical" onChange={this.props.update}
                               />
                                {weapon.critical < 20? <span>&ndash;20</span>: ''}
                             </span>
                            <span>
                                <sub>X</sub>
                            </span>
                            <input type="number" value={weapon.critMultiplier} disabled={!this.state.edit}
                               data-index={index} data-name="critMultiplier" onChange={this.props.update}
                               aria-describedby={"weapon-"+index+"-critical"} className="critical"/>
                        </div>

                    </div>
                    {/*
                </div>
                <div className="flex-container flex-wrap" style={{textAlign: "center"}}>
                     */}
                    <div className="weapon-field">
                            <span id={"weapon-"+index+"-type"} className="help-block" style={{marginTop: 15}}>
                                <h6 className="field-block">Type</h6>
                            </span>
                        <input type="text" value={weapon.type} data-name="type" data-index={index}
                               onChange={this.props.update} className="small"/>
                    </div>
                    <div className="weapon-field">
                            <span id={"weapon-"+index+"-range"} className="help-block" style={{marginTop: 15}}>
                               <h6 className="field-block">Range</h6>
                            </span>
                        {weapon.range
                            ? this.state.edit? '': <div aria-describedy={"weapon-"+index+"-range"}>
                                    <select defaultValue="0" onChange={this.incrementRange} data-index={index}
                                        className="range-select">
                                        {this.makeIncrementList(weapon.range).map((increment, incIndex)=>{
                                            return <option value={incIndex}>{increment}</option>
                                        })}
                                    </select>
                                    ft.
                                </div>
                            : this.state.edit? '': <span aria-describedy={"weapon-"+index+"-range"}>&ndash;</span>}
                        {this.state.edit
                            ? <input type="number" data-name="range" data-index={index} value={weapon.range}
                                     onChange={this.props.update} aria-describedby={"weapon-"+index+"-range"}
                                     className="small"/>
                            : ''
                        }
                    </div>
                    <div className="weapon-field">
                            <span id={"weapon-"+index+"-ammunition"} className="help-block" style={{marginTop: 15}}>
                               <h6 className="field-block">Ammunition</h6>
                            </span>
                        <div aria-describedby={"weapon-"+index+"-ammunition"}
                             style={{textAlign: "center"}}>
                            <input type="number" value={weapon.ammunition} data-index={index} data-name="ammunition"
                                   onChange={this.props.update} className="small"/>
                        </div>

                    </div>
                </div>
                <div className="weapon-field">
                        <span id={"weapon-"+index+"-damage"} className="help-block" style={{marginTop: 15}}>
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