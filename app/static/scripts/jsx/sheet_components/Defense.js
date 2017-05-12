/**
 * Created by edward on 4/8/17.
 */
import AddBoxes from '../base_components/AddBoxes';

const Defense = React.createClass({
    updateAC(e) {
        let value = e.target.value;
        if(e.target.type == "number") value = parseInt(value) >= 0? parseInt(value): 0;
        this.props.updateCharacter('AC_update', value, e.target.dataset.name);
    },
    updateSave(e) {
        let value = e.target.value;
        if(e.target.type == "number") value = parseInt(value)? parseInt(value) : 0;
        let saveKey = e.target.dataset.parent? e.target.dataset.parent: e.target.dataset.name;
        let nestedKey = e.target.dataset.parent? e.target.dataset.name: null;
        this.props.updateCharacter('save', value, saveKey, nestedKey);
    },
    computeTFF(acBoxes, which) {
        let boxes = $.extend(true, {}, acBoxes);
        let exclude = this.props.defense[which+'_exclude'];
        Object.keys(exclude).map((key)=>{exclude[key]? delete boxes[key]: null});
        return boxes;
    },
    makeSaveBox(name, abilityMod) {
        let saveData = this.props.defense['Saves'][name];
        return {
            name: name, 'Base Save': {
                value: saveData['Base Save'],
                edit: true,
                change: this.updateSave
            }, 'Ability Modifier': {
                value: abilityMod
            }, 'Magic Modifier': {
                value: saveData['Magic Modifier'],
                edit: true,
                change: this.updateSave
            }, 'Misc Modifier': {
                value: saveData['Misc Modifier'],
                edit: true,
                change: this.updateSave
            }, 'Temporary Modifier': {
                value: saveData['Temporary Modifier'],
                edit: true,
                change: this.updateSave
            }
        };
    },
    render() {
        let armorBonus = this.props.defense['AC']['Armor Bonus'];
        let shieldBonus = this.props.defense['AC']['Shield Bonus'];
        let naturalArmor = this.props.defense['AC']['Natural Armor'];
        let deflectionMod = this.props.defense['AC']['Deflection Modifier'];
        let dodgeBonus = this.props.defense['AC']['Dodge Bonus'];
        let miscMod = this.props.defense['AC']['Misc Modifier'];
        let modNotes = this.props.defense['AC']['Mod Notes'];
        let acBoxes = { // TODO: change acBoxes to be adjustable (add wisMod, things like that).
            name: 'Armor Class', '10': {
                value: 10,
                noLabel: true,
            }, 'Armor Bonus': {
                value: armorBonus,
                edit: true,
                change: this.updateAC
            }, 'Shield Bonus': {
                value: shieldBonus,
                edit: true,
                change: this.updateAC
            }, 'DEX Mod': {
                value: this.props.dexMod
            }, 'Size Mod': {
                value: 0, // need to replace with size modifier, when I have that implemented
            }, 'Natural Armor': {
                value: naturalArmor,
                edit: true,
                change: this.updateAC
            }, 'Deflection Modifier': {
                value: deflectionMod,
                edit: true,
                change: this.updateAC
            }, 'Dodge Bonus': {
                value: dodgeBonus,
                edit: true,
                change: this.updateAC
            }, 'Misc Modifier': {
                value: miscMod,
                edit: true,
                change: this.updateAC
            }
        };
        let touchBoxes = this.computeTFF(acBoxes, 'Touch'); // TODO: change touchBoxes to be adjustable
        let flatFootedBoxes = this.computeTFF(acBoxes, 'Flat-footed'); // TODO: change flatFootedBoxes to be adjustable
        let fortBoxes = {
            name: 'Fortitude', 'Base Save': {

            }, 'Ability Modifier': {

            }, 'Magic Modifier': {

            }, 'Misc Modifier': {

            }, 'Temporary Modifier': {

            }
        };
        return (
            <div className="col-xs-12 col-md-3 flex-item bordered flex-container-col flex-wrap">
                {/*<h2 className="col-xs-12" style={{textAlign: "center"}}>Defense</h2>*/}
                <div className="flex-container flex-wrap">
                    <ul className="list-unstyled field-block flex-item">
                        <li>AC</li>
                        <li><sup>Armor Class</sup></li>
                    </ul>
                    &nbsp;&nbsp;
                    <AddBoxes boxes={acBoxes}/>
                </div>
                <div className="flex-container flex-wrap">
                    <ul className="list-unstyled field-block small-item">
                        <li>Touch</li>
                        <li><sup>Armor Class</sup></li>
                    </ul>
                    &nbsp;&nbsp;
                    <div className="flex-item">
                        <AddBoxes boxes={touchBoxes} totalOnly={true}/>
                    </div>
                    <ul className="list-unstyled field-block small-item">
                        <li>Flat-Footed</li>
                        <li><sup>Armor Class</sup></li>
                    </ul>
                    &nbsp;&nbsp;
                    <div className="flex-item">
                        <AddBoxes boxes={flatFootedBoxes} totalOnly={true}/>
                    </div>
                    <div className="flex-item">
                        <textarea value={modNotes} onChange={this.updateAC} data-name="Mod Notes"
                                  className="flex-item ac-modifiers" aria-describedby="AC Mods"/>
                        <span id="AC Mods" className="help-block">
                            <sup>Modifiers</sup>
                        </span>
                    </div>
                </div>
                <table className="table-responsive">
                    <tr className="table-header">
                        <th colSpan="2">Saving Throws</th>
                    </tr>
                    {["Fortitude", "Reflex", "Will"].map((saveName)=>{
                        let mod, modName;
                        if(saveName == "Fortitude"){ mod = this.props.conMod; modName = "Constitution"; }
                        else if(saveName == "Reflex") { mod = this.props.dexMod; modName = "Dexterity"; }
                        else { mod = this.props.wisMod; modName = "Wisdom"; }
                        return (
                            <tr>
                                <td>
                                    <ul className="list-unstyled field-block small-item">
                                        <li>{saveName}</li>
                                        <li><sup>({modName})</sup></li>
                                    </ul>
                                </td>
                                <td><AddBoxes boxes={this.makeSaveBox(saveName, mod)}/></td>
                            </tr>
                        )
                    })}
                </table>
                <div className="">
                        <textarea value={this.props.defense['Saves']['Modifiers']} onChange={this.updateSave}
                                  data-name="Modifiers" aria-describedby="Save Mods" className=""/>
                    <span id="Save Mods" className="help-block">
                            <sup>Modifiers</sup>
                        </span>
                </div>
            </div>
        );
    }
});

export default Defense;
