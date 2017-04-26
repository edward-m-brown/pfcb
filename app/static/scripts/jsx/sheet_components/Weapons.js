/**
 * Created by edward on 4/23/17.
 */
import AddBoxes from '../base_components/AddBoxes'
import Manager from '../base_components/Manager'

function weaponsTemplate() {
    return [
        {
            name: 'Deafult melee',
            attack: ["strMod", "baseAttack"], // AddBoxes format
            critical: [19,20], // string now, tuple later?
            critMultiplier: 2,
            type: 'S',
            range: 0,
            ammunition: 0, // MUCH later, could be direct reference to Gear
            damage: [1,6], //string now, tuple later?
            damageBonus: ["STR Mod"], // AddBoxes format
            miscAttack: 0,
            miscDamage: 0,
            enhancement: 0
        }, {
            name: 'Default ranged',
            attack: ["dexMod", "baseAttack"], // AddBoxes format
            critical: 20, // string now, tuple later?
            critMultiplier: 2,
            type: 'P',
            range: 30,
            ammunition: 50, // MUCH later, could be direct reference to Gear
            damage: [1,6], //string now, tuple later?
            damageBonus: [], // AddBoxes format
            miscAttack: 0,
            miscDamage: 0,
            enhancement: 0
        }, {
            name: 'Default thrown',
            attack: ["dexMod", "baseAttack"], // AddBoxes format
            critical: 20, // string now, tuple later?
            critMultiplier: 2,
            type: 'P',
            range: 20,
            ammunition: 10, // MUCH later, could be direct reference to Gear
            damage: '1d6', //string now, tuple later?
            damageBonus: ["strMod"], // AddBoxes format
            miscAttack: 0,
            miscDamage: 0,
            enhancement: 0
        }, {
            name: '',
            attack: ["baseAttack"], // AddBoxes format
            critical: 20, // string now, tuple later?
            critMultiplier: 0,
            type: '',
            range: 0,
            ammunition: 0, // MUCH later, could be direct reference to Gear
            damage: [1,6], //string now, tuple later?
            damageBonus: [], // AddBoxes format
            miscAttack: 0,
            miscDamage: 0,
            enhancement: 0
        }, {
            name: '',
            attack: ["baseAttack"], // AddBoxes format
            critical: 20, // string now, tuple later?
            critMultiplier: 0,
            type: '',
            range: 0,
            ammunition: 0, // MUCH later, could be direct reference to Gear
            damage: [1,6], //string now, tuple later?
            damageBonus: [], // AddBoxes format
            miscAttack: 0,
            miscDamage: 0,
            enhancement: 0
        }
    ]
}

const Weapons = React.createClass({
    getInitialState(){
        return { edit_weapon: {}}
    },
    updateWeapon(e) {
        let value = e.target.type == "number"? parseInt(e.target.value): e.target.value;
        let index = parseInt(e.target.dataset.index);
        this.props.updateCharacter('weapon', value, index, e.target.dataset.name)
    },
    makeBoxes(boxType, weapon) {
        let boxes = {
            name: weapon.name, enhancement: {
                value: weapon.enhancement, change: this.updateWeapon
            }};
        let array;
        if(boxType == 'attack') {
            boxes['miscAttack'] = {value: weapon.miscAttack, change: this.updateWeapon};
            array = weapon.attack;
        } else {
            boxes['miscDamage'] = {value: weapon.miscDamage, change: this.updateWeapon};
            array = weapon.damageBonus;
        }
        for(let item in array) {
            boxes[array[item]] = {value: this.props[array[item]]};
        }
        return boxes;
    },
    render() {
        let tableOrder = ['name', 'attack', 'critical', 'critMultiplier', 'type', 'range',
            'ammunition', 'damage', 'damageBonus']
        if(!this.props.weapons) {
            this.props.updateCharacter('add_weapons', weaponsTemplate());
            return <h1>Loading character weapons...</h1>
        }
        else
            return(
                <div>
                    <h2>Weapons</h2>
                    {this.props.weapons.map((weapon, index)=>{
                       return(
                           <div className="flex-container-col">
                               <div className="flex-container flex-item">
                                   {/* name, attack, critical, critMultiplier*/}
                                   <div className="flex-item">
                                       <span id={"weapon-"+index+"-name"} className="help-block flex-item">
                                           <h4 className="field-block">Weapon</h4>
                                       </span>
                                       <button data-toggle="modal" data-target="#weaponManager" title="Edit Weapon">
                                           <span className="glyphicon glyphicon-pencil"></span>
                                       </button>
                                       <input type="text" data-index={index} data-name="name" value={weapon.name}
                                           onChange={this.updateWeapon} aria-describedby={"weapon-"+index+"-name"}/>
                                   </div>
                                   <div className="flex-item">
                                       <span id={"weapon-"+index+"-attack"} className="help-block flex-item">
                                           <h6 className="field-block">Attack Bonus</h6>
                                       </span>
                                       <AddBoxes boxes={this.makeBoxes('attack', weapon)} index={index}
                                           totalOnly={true} describedBy={"weapon-"+index+"-attack"}/>
                                   </div>
                                   <div className="flex-item"></div>
                                   <div className="flex-item"></div>
                               </div>
                               <div className="flex-container flex-item">
                                   <div className="flex-item"></div>
                                   <div className="flex-item"></div>
                                   <div className="flex-item"></div>
                                   <div className="flex-item"></div>
                                   <div className="flex-item"></div>
                               </div>
                           </div>
                       )
                    })}

                </div>
            );
    }
});

export default Weapons;