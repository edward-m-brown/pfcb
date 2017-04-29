/**
 * Created by edward on 4/23/17.
 */
import Weapon from '../sub_components/Weapon'


function weaponsTemplate() {
    return [
        {
            name: 'Deafult melee',
            attack: ["strMod", "baseAttack"], // AddBoxes format
            critical: 19, // string now, tuple later?
            critMultiplier: 2,
            type: 'S',
            range: 0,
            ammunition: 0, // MUCH later, could be direct reference to Gear
            damage: [1,6], //string now, tuple later?
            damageBonus: ["strMod"], // AddBoxes format
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
            critMultiplier: 2,
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
            critMultiplier: 2,
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
        return { edit: -1}
    },
    updateWeapon(e) {
        let value = e.target.type == "number"? parseInt(e.target.value): e.target.value;
        let index = parseInt(e.target.dataset.index);
        this.props.updateCharacter('weapon', value, index, e.target.dataset.name)
    },
    incrementRange(e) {
        let increments = Object.assign([], this.state.increments);
        increments[parseInt(e.target.dataset.index)] = parseInt(e.target.value);
        this.setState({
            increments: increments
        });
        console.log("Changed increments["+parseInt(e.target.dataset.index)+"] to: "+parseInt(e.target.value))
    },
    makeBoxes(boxType, weapon, index) {
        let boxes = {
            name: weapon.name, enhancement: {
                value: weapon.enhancement, change: this.updateWeapon
            }};
        let array;
        if(boxType == 'attack') {
            boxes['miscAttack'] = {value: weapon.miscAttack, change: this.updateWeapon};
            array = weapon.attack;
            if(weapon.range){
                boxes['rangePenalty'] = {
                    value: -2 * this.state.increments[index]
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
    render() {
        {/*let tableOrder = ['name', 'attack', 'critical', 'critMultiplier', 'type', 'range',
         'ammunition', 'damage', 'damageBonus']*/}
        if(!this.props.weapons) {
            this.props.updateCharacter('add_weapons', weaponsTemplate());
            return <h1>Loading character weapons...</h1>
        }
        else
            return(
                <div className="col-xs-12 col-md-6 bordered">
                    <h2>Weapons</h2>
                    {this.props.weapons.map((weapon, index)=>{
                       return(
                           <Weapon weapon={weapon} index={index}
                               strMod={this.props.strMod} dexMod={this.props.dexMod} conMod={this.props.conMod}
                               intMod={this.props.intMod} wisMod={this.props.wisMod} chaMod={this.props.chaMod}
                               baseAttack={this.props.baseAttack} update={this.updateWeapon}/>
                       )
                    })}

                </div>
            );
    }
});

export default Weapons;