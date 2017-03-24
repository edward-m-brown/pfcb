
let sizes = ["Fine", "Diminutive", "Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan", "Colossal"];
let alignments = [
    "Lawful Good", "Neutral Good", "Chaotic Good",
    "Lawful Neutral", "True Neutral", "Chaotic Neutral",
    "Lawful Evil", "Neutral Evil", "Chaotic Evil"
];
let races = [ "Human", "Elf", "Half-elf", "Dwarf", "Gnome", "Halfling", "Half-orc" ]
var Description = React.createClass({
    getInitialState(){
        return {
            alignment: this.props.description["Alignment"]
        }
    },
    updateName(event) {
        this.props.updateName(event.target.value)
    },
    updateDescription(event) {
        let value = event.target.type == "text" || event.target.type == "select-one"
            ? event.target.value
            : parseInt(event.target.value);
        this.props.updateDescription(event.target.name, value)
    },
    render(){
        let classNames = Object.keys(this.props.levels)
        return(
            <div className="flex-container-col">
                {/*Character Name, Alignment, Player*/}
                <div className="flex-item">
                    <div className="flex-container">
                        <div className="flex-item">
                            <input  className="form-control" aria-describedby="name"
                                type="text" value={this.props.characterName}
                                onChange={this.updateName} />
                            <span id="name" className="help-block">Character Name</span>
                        </div>
                        <div className="flex-item">
                            <select  className="form-control" aria-describedby="alignment"
                                   name="Alignment"
                                   value={this.props.description["Alignment"]}
                                   onChange={this.updateDescription}>
                                {
                                    alignments.map((alignment)=>{
                                        return <option value={alignment}>{alignment}</option>
                                    })
                                }
                            </select>
                            <span id="alignment" className="help-block">Alignment</span>
                        </div>
                        <div className="flex-item">
                            <text  className="form-control" aria-describedby="player-name">
                                PLACEHOLDER_VALUE
                            </text>
                            <span id="player-name" className="help-block">Player</span>
                        </div>
                    </div>
                </div>
                {/* Character Level, Deity, Homeland*/}
                <div className="flex-item">
                    <div className="flex-container">
                        <div className="flex-item">
                            <div  className="form-control" aria-describedby="character-level">
                                {classNames.map((className, index)=>{
                                    return (
                                        <span>
                                            <b>{className}:</b> {this.props.levels[className]}
                                            {classNames[index+1] ? "; ": ""}
                                        </span>
                                    )
                                })}
                            </div>
                            <span id="character-level" className="help-block">
                                Character Level
                                {/*<button>Level Up!</button> or something like that needs to be here*/}
                            </span>
                        </div>
                        <div className="flex-item">
                            <input  className="form-control" aria-describedby="deity"
                                   type="text" value={this.props.description["Deity"]}
                                   name="Deity"
                                   onChange={this.updateDescription} />
                            <span id="deity" className="help-block">Deity</span>
                        </div>
                        <div className="flex-item">
                            <input  className="form-control" aria-describedby="homeland"
                                   type="text" value={this.props.description["Homeland"]}
                                   name="Homeland"
                                   onChange={this.updateDescription} />
                            <span id="homeland" className="help-block">Homeland</span>
                        </div>
                    </div>
                </div>
                <div className="flex-item">
                    <div className="flex-container">
                    {/*Race, Size, Gender, Age*/}
                        <div className="flex-item">
                            <select  className="form-control" aria-describedby="race"
                                    name="Race"
                                    value={this.props.description["Race"]}
                                    onChange={this.updateDescription}>
                                {
                                    races.map((race)=>{
                                        return <option value={race}>{race}</option>
                                    })
                                }
                            </select>
                            <span id="race" className="help-block">Race</span>
                        </div>
                        <div className="flex-item">
                            <select  className="form-control" aria-describedby="size"
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
                            <input  className="form-control" aria-describedby="gender"
                                   type="text" value={this.props.description["Gender"]}
                                   name="Gender"
                                   onChange={this.updateDescription} />
                            <span id="gender" className="help-block">Gender</span>
                        </div>
                        <div className="flex-item">
                            <input   className="form-control" aria-describedby="age"
                                   type="number" value={this.props.description["Age"]}
                                   name="Age"
                                   onChange={this.updateDescription} />
                            <span id="age" className="help-block">Age</span>
                        </div>
                    </div>
                </div>
                <div className="flex-item">
                    {/* Height, Weight, Hair, Eyes*/}
                    <div className="flex-container">
                        <div className="flex-item">
                            <input  className="form-control" aria-describedby="height"
                                   type="text" value={this.props.description["Height"]}
                                   name="Height"
                                   onChange={this.updateDescription} />
                            <span id="height" className="help-block">Height</span>
                        </div>
                        <div className="flex-item">
                            <input  className="form-control" aria-describedby="weight"
                                   type="text" value={this.props.description["Weight"]}
                                   name="Weight"
                                   onChange={this.updateDescription} />
                            <span id="weight" className="help-block">Weight</span>
                        </div>
                        <div className="flex-item">
                            <input  className="form-control" aria-describedby="hair"
                                   type="text" value={this.props.description["Hair"]}
                                   name="Hair"
                                   onChange={this.updateDescription} />
                            <span id="hair" className="help-block">Hair</span>
                        </div>
                        <div className="flex-item">
                            <input  className="form-control" aria-describedby="eyes"
                                   type="text" value={this.props.description["Eyes"]}
                                   name="Eyes"
                                   onChange={this.updateDescription} />
                            <span id="eyes" className="help-block">Eyes</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Description;
