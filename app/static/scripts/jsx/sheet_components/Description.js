import Levels from './Levels'
let sizes = ["Fine", "Diminutive", "Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan", "Colossal"];
let alignments = [
    "LG", "NG", "CG",
    "LN", "TN", "CN",
    "LE", "NE", "CE"
];
let races = [ "Human", "Elf", "Half-elf", "Dwarf", "Gnome", "Halfling", "Half-orc" ]
var Description = React.createClass({
    getInitialState(){
        return {
            alignment: this.props.description["Alignment"],
            show: true
        }
    },
    toggleShow() {
        this.setState({show: !this.state.show});
    },
    updateName(event) {
        this.props.updateCharacter('name', event.target.value);
    },
    updateDescription(event) {
        let value = event.target.type == "text" || event.target.type == "select-one"
            ? event.target.value
            : parseInt(event.target.value);
        this.props.updateCharacter('description', value, event.target.name)
    },
    render(){
        return(
            <div className="flex-container col-xs-12 bordered">
                <button onClick={this.toggleShow} title={this.state.show
                    ? "Hide Description": "Show Description"}>
                        <span className={this.state.show
                            ? "glyphicon glyphicon-eye-close"
                            : "glyphicon glyphicon-eye-open"}/>
                </button>
                <div style={{textAlign: "center", display: this.state.show? '': 'none'}}>{/*Image here*/}</div>
                <div className="flex-container-col">
                <h2 className="col-md-12" style={{textAlign: "center", display: this.state.show? '': 'none'}}>
                    Description
                </h2>
                <div className="flex-container flex-wrap" style={{display: this.state.show? '': 'none'}}>
                    <div className="flex-item">
                        <input className="" aria-describedby="name"
                            type="text" value={this.props.characterName}
                            onChange={this.updateName} />
                        {/**/}<span id="name" className="help-block">Character Name</span>
                    </div>
                    <div className="flex-item">
                        <select className="" aria-describedby="alignment" name="Alignment"
                            value={this.props.description["Alignment"]} onChange={this.updateDescription}>
                            {
                                alignments.map((alignment)=>{
                                    return <option value={alignment}>{alignment}</option>
                                })
                            }
                        </select>
                        {/**/} <span id="alignment" className="help-block">Alignment</span>
                    </div>
                    {/*Change this to incorporate some actual data for Races. Either from backend or simple
                        structures made in the frontend, doesn't matter.*/}
                    <div className="flex-item">
                        <select aria-describedby="race" className=""
                            name="Race" value={this.props.description["Race"]} onChange={this.updateDescription}>
                            {
                                races.map((race)=>{
                                    return <option value={race}>{race}</option>
                                })
                            }
                        </select>
                        {/**/} <span id="race" className="help-block">Race</span>
                    </div>
                    <div className="flex-item">
                        <select className="" aria-describedby="size"
                                name="Size"
                                value={this.props.description["Size"]}
                                onChange={this.updateDescription}>
                            {
                                sizes.map((size)=>{
                                    return <option value={size}>{size}</option>
                                })
                            }
                        </select>
                        <span id="size" className="help-block">Size</span>
                    </div>
                    <div className="flex-item">
                        <input className="" aria-describedby="deity"
                                type="text" value={this.props.description["Deity"]}
                                name="Deity"
                                onChange={this.updateDescription} />
                        <span id="deity" className="help-block">Deity</span>
                    </div>
                    <div className="flex-item">
                        <input className="" aria-describedby="homeland"
                                type="text" value={this.props.description["Homeland"]}
                                name="Homeland"
                                onChange={this.updateDescription} />
                        <span id="homeland" className="help-block">Homeland</span>
                    </div>
                    <div className="flex-item">
                        <input className="" aria-describedby="gender"
                                type="text" value={this.props.description["Gender"]}
                                name="Gender"
                                onChange={this.updateDescription} />
                        <span id="gender" className="help-block">Gender</span>
                    </div>
                    <div className="flex-item">
                        <input className="" aria-describedby="age"
                                 type="number" value={this.props.description["Age"]}
                                 name="Age"
                                 onChange={this.updateDescription} />
                        <span id="age" className="help-block">Age</span>
                    </div>
                    <div className="flex-item">
                        <input className="" aria-describedby="height"
                                type="text" value={this.props.description["Height"]}
                                name="Height"
                                onChange={this.updateDescription} />
                        <span id="height" className="help-block">Height</span>
                    </div>
                    <div className="flex-item">
                        <input className="" aria-describedby="weight"
                                type="text" value={this.props.description["Weight"]}
                                name="Weight"
                                onChange={this.updateDescription} />
                        <span id="weight" className="help-block">Weight</span>
                    </div>
                    <div className="flex-item">
                        <input className="" aria-describedby="hair"
                                type="text" value={this.props.description["Hair"]}
                                name="Hair"
                                onChange={this.updateDescription} />
                        <span id="hair" className="help-block">Hair</span>
                    </div>
                    <div className="flex-item">
                        <input className="" aria-describedby="eyes"
                                type="text" value={this.props.description["Eyes"]}
                                name="Eyes"
                                onChange={this.updateDescription} />

                        <span id="eyes" className="help-block">Eyes</span>
                    </div>
                    <div className="flex-item">
                        <Levels levels={this.props.levels} classes={this.props.classes} modifiers={this.props.modifiers}
                                updateCharacter={this.props.updateCharacter} describedBy="levels"/>
                        <span id="levels" className="help-block">Class Levels</span>
                    </div>
                </div>
                </div>
            </div>
        );
    }
});

export default Description;
