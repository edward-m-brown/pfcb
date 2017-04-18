/**
 * Created by edward on 4/8/17.
 */
import AddBoxes from '../base_components/AddBoxes'

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
        this.props.updateCharacter(event.target.dataset.name, parseInt(event.target.value));
    },
    render() {
        let initBoxes = {
            name: 'Initiative', 'DEX Mod': {
                value: this.props.dexMod,
                edit: false
            }, 'Misc Mod': {
                value: this.props.initMod,
                edit: true,
                change: this.changeInit
            }
        };
        let cmdBoxes = {
            name: 'CMD', 'Base Attack Bonus': {
                value: this.props.baseAttack,
                edit: false
            }, 'STR Mod': {}
        }
        return (
            <div className="col-xs-12 col-md-4 bordered flex-container-col flex-wrap">
                <h2 className="col-xs-12" style={{textAlign: "center"}}>Offense</h2>
                <div className="flex-container flex-wrap flex-item">
                    <ul className="list-unstyled field-block small-item">
                        <li>Base Attack</li>
                        <li><sub>Bonus</sub></li>
                    </ul>
                    <div className="flex-item">
                        &nbsp;+
                        <input type="number" value={this.props.baseAttack} style={{width: 50}}
                               data-name="BAB" onChange={this.update}/>
                        {this.props.baseAttack >= 6
                            ? <text>{this.computeMulti(this.props.baseAttack)}</text>
                            : ''}
                    </div>
                </div>
                <div className="flex-item flex-container">
                    <ul className="list-unstyled field-block small-item">
                        <li>Initiative</li>
                        <li><sub>Modifier</sub></li>
                    </ul>
                    &nbsp;&nbsp;
                    <div className="flex-item">
                        <AddBoxes boxes={initBoxes}/>
                    </div>
                </div>

            </div>
        );
    }
});

export default Offense;

