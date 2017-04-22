/**
 * Created by edward on 4/8/17.
 */
import AddBoxes from '../base_components/AddBoxes'
import Note from '../base_components/Note'

const Offense = React.createClass({
    computeMulti(baseAttack) {
        let attack = 0 + baseAttack;
        let text = ""
        while(attack - 5 >= 1){
            attack -= 5;
            text += "/+" + attack;
        }
        return text;
    },
    changeInit(e) {
        this.props.updateCharacter('initiative', parseInt(e.target.value));
    },
    update(e) {
        let value = e.target.type == "number"? parseInt(e.target.value): e.target.value;
        this.props.updateCharacter(e.target.dataset.name, value);
    },
    render() {
        let baseAttack = this.props.offense['BAB'];
        let initiative = this.props.offense['Initiative Modifier'];
        let cmbMod = this.props.offense['CMB Modifiers'];
        let initBoxes = {
            name: 'Initiative', 'DEX': {
                value: this.props.dexMod
            }, 'Misc': {
                value: initiative,
                edit: true,
                change: this.changeInit
            }
        };
        let cmbBoxes = {
            name: 'CMD', 'Base Attack': {
                value: baseAttack
            }, 'Strength Modifier': {
                value: this.props.strMod,
            }, 'Size Modifier': {
                value: 0, // need to replace with size modifier, when I have that implemented
            }
        };
        let cmdBoxes = {
            name: 'CMD', 'BAB': {
                value: baseAttack,
            }, 'STR': {
                value: this.props.strMod,
            }, 'Size': {
                value: 0, // need to replace with size modifier, when I have that implemented
            }, 'DEX': {
                value: this.props.dexMod,
            }, 'Z' : {
                value: 10,
                noLabel: true
            }
        };

        return (
            <div className="col-xs-12 col-md-6 bordered flex-container-col flex-wrap">
                <h2 className="col-xs-12" style={{textAlign: "center"}}>Offense</h2>
                <div className="flex-container flex-wrap flex-item">
                    <ul className="list-unstyled field-block small-item">
                        <li>Base Attack</li>
                        <li><sup>Bonus</sup></li>
                    </ul>
                    <div className="flex-item">
                        &nbsp;+
                        <input type="number" value={baseAttack} style={{width: 40}}
                               data-name="BAB" onChange={this.update}/>
                        {baseAttack >= 6
                            ? <text>{this.computeMulti(baseAttack)}</text>
                            : ''}
                    </div>
                    &nbsp;&nbsp;
                    <div className="flex-item flex-container">
                        <ul className="list-unstyled field-block small-item">
                            <li>Initiative</li>
                            <li><sup>Modifier</sup></li>
                        </ul>
                        &nbsp;&nbsp;
                        <div className="flex-item">
                            <AddBoxes boxes={initBoxes}/>
                        </div>
                    </div>
                </div>

                <div className="flex-item flex-container flex-wrap">
                    <ul className="list-unstyled field-block small-item">
                        <li>CMB</li>
                    </ul>
                    &nbsp;&nbsp;
                    <div className="flex-item">
                        <AddBoxes boxes={cmbBoxes}/>
                    </div>
                    <div className="flex-item">
                        <textarea value={cmbMod} onChange={this.update} data-name="cmb_mod"
                            className="flex-item" aria-describedby="CMB Mod"
                            style={{resize: "horizontal", maxWidth: 300}}/>
                        <span id="CMB Mod" className="help-block">
                            <sup>Modifiers</sup>
                        </span>

                    </div>
                </div>
                <div className="flex-item flex-container">
                    <ul className="list-unstyled field-block small-item">
                        <li>CMD</li>
                    </ul>
                    &nbsp;&nbsp;
                    <div className="flex-item">
                        <AddBoxes boxes={cmdBoxes}/>
                    </div>
                </div>

            </div>
        );
    }
});

export default Offense;

