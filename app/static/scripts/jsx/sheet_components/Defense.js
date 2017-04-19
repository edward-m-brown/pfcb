/**
 * Created by edward on 4/8/17.
 */
const Defense = React.createClass({
    update(e) {
        let value = e.target.type == "number"? parseInt(e.target.value): e.target.value;
        this.props.updateCharacter('Armor', value, event.target.dataset.name);
    },
    render() {
        let armorBonus = this.props.defense['AC']['Armor Bonus'];
        let naturalArmor = this.props.defense['AC']['Natural Armor'];
        let deflection = this.props.defense['AC']['Deflection'];
        let miscBonus = this.props.defense['AC']['Misc'];
        let acBoxes = {
            name: 'Armor Class', '10': {
                value: 10,
                noLabel: true
            }, 'Armor Bonus': {
                value: armorBonus,
                edit: true,
                change: this.update
            }, 'DEX Modifier': {
                value: this.props.dexMod
            }, 'Size Modifier': {
                value: 0, // need to replace with size modifier, when I have that implemented
            }, 'Natural Armor': {
                value: naturalArmor,
                edit: true,
                change: this.update
            }, 'Deflection': {
                value: deflection,
                edit: true,
                change: this.update
            }, 'Misc': {
                value: this.props.initMod,
                edit: true,
                change: this.changeInit
            }
        };
        return (
            <div className="col-xs-12 col-md-6 bordered flex-container-col flex-wrap">
                <h2 className="col-xs-12" style={{textAlign: "center"}}>Offense</h2>
                <div className="flex-container flex-wrap flex-item">
                    <ul className="list-unstyled field-block small-item">
                        <li>AC</li>
                        <li><sub>Armor Class</sub></li>
                    </ul>
                    <div className="flex-item">
                        &nbsp;+
                        <input type="number" value={this.props.baseAttack} style={{width: 40}}
                               data-name="BAB" onChange={this.update}/>
                        {this.props.baseAttack >= 6
                            ? <text>{this.computeMulti(this.props.baseAttack)}</text>
                            : ''}
                    </div>
                    &nbsp;&nbsp;
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

                <div className="flex-item flex-container flex-wrap">
                    <ul className="list-unstyled field-block small-item">
                        <li>CMB</li>
                    </ul>
                    &nbsp;&nbsp;
                    <div className="flex-item">
                        <AddBoxes boxes={cmbBoxes}/>
                    </div>
                    <div className="flex-item">
                        <textarea value={this.props.note} onChange={this.props.update} data-name="cmb_mod"
                                  className="flex-item" aria-describedby="CMB Mod"
                                  style={{resize: "horizontal", maxWidth: 300}}/>
                        <span id="CMB Mod" className="help-block">
                            <small>Modifiers</small>
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

export default Defense;
