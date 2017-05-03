/**
 * Created by edward on 4/23/17.
 */
import Weapon from '../sub_components/Weapon'


function weaponsTemplate() {
    return [
        {
            name: 'Deafult melee',
            attack: ["strMod"], // AddBoxes format
            critical: 19, // string now, tuple later?
            critMultiplier: 2,
            type: 'S',
            range: 0,
            ammunition: 0, // MUCH later, could be direct reference to Gear
            damage: [1,6], //string now, tuple later?
            damageBonus: ["strMod"], // AddBoxes format
            miscAttack: 0,
            miscDamage: 0,
            enhancement: 0,
            notes: ''
        }, {
            name: 'Default ranged',
            attack: ["dexMod"], // AddBoxes format
            critical: 20, // string now, tuple later?
            critMultiplier: 2,
            type: 'P',
            range: 30,
            ammunition: 50, // MUCH later, could be direct reference to Gear
            damage: [1,6], //string now, tuple later?
            damageBonus: [], // AddBoxes format
            miscAttack: 0,
            miscDamage: 0,
            enhancement: 0,
            notes: ''
        }, {
            name: 'Default thrown',
            attack: ["dexMod"], // AddBoxes format
            critical: 20, // string now, tuple later?
            critMultiplier: 2,
            type: 'P',
            range: 20,
            ammunition: 10, // MUCH later, could be direct reference to Gear
            damage: [1,6], //string now, tuple later?
            damageBonus: ["strMod"], // AddBoxes format
            miscAttack: 0,
            miscDamage: 0,
            enhancement: 0,
            notes: ''
        }, {
            name: '',
            attack: [], // AddBoxes format
            critical: 20, // string now, tuple later?
            critMultiplier: 2,
            type: '',
            range: 0,
            ammunition: 0, // MUCH later, could be direct reference to Gear
            damage: [1,6], //string now, tuple later?
            damageBonus: [], // AddBoxes format
            miscAttack: 0,
            miscDamage: 0,
            enhancement: 0,
            notes: ''
        }, {
            name: '',
            attack: [], // AddBoxes format
            critical: 20, // string now, tuple later?
            critMultiplier: 2,
            type: '',
            range: 0,
            ammunition: 0, // MUCH later, could be direct reference to Gear
            damage: [1,6], //string now, tuple later?
            damageBonus: [], // AddBoxes format
            miscAttack: 0,
            miscDamage: 0,
            enhancement: 0,
            notes: ''
        }
    ]
}

const Weapons = React.createClass({
    updateWeapon(e) {
        let value = e.target.type == "number"? parseInt(e.target.value): e.target.value;
        let name = e.target.dataset.name;
        // set boundaries on field values.
        if((name == "ammunition" || name == "range") && value <= 0) value = 0;
        if((name == "damage" || name == "critical") && value <= 1) value = 1;
        if(name == "critical" && value > 20) value = 20;
        if(name == "critMultiplier" && value <= 2) value = 2;
        let index = parseInt(e.target.dataset.index);
        if(name == "attack" || name == "damageBonus"){
            if(value)
                this.props.updateCharacter('weapon_bonus', value, index, name, e.target.dataset.action)
        }
        else
            this.props.updateCharacter('weapon', value, index, name, parseInt(e.target.dataset.nested));
        console.log(e.target.dataset.name, e.target.dataset.index, e.target.dataset.nested, e.target.value)
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
                    {/*<h2>Weapons</h2>*/}
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