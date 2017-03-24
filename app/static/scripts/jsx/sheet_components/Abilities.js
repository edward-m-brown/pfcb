var $=require('jquery')
var longNames = {
    "STR": "Strength",
    "DEX": "Dexterity",
    "CON": "Constitution",
    "INT": "Intelligence",
    "WIS": "Wisdom",
    "CHA": "Charisma"
};

var Abilities = React.createClass({
    handleChange(event) {
        let name = event.target.name;
        let value = parseInt(event.target.value);
        event.target.alt == "temp"
            ? this.props.updateTemp(name, value)
            : this.props.updateBase(name, value)
    },
    handleBlur(event) {

    },
    render() {
       let scores = this.props.abilityScores;
       let mods = this.props.abilityMods;
       let temp_adjustments = this.props.tempAdjustments;
       let temp_mods = this.props.tempMods;
       return(
           <div className="flex-container-col" style={{width: 600}}>
               <div className="flex-item">
                   <div className="flex-container">
                       <div className="flex-item">Ability Name</div>
                       <div className="flex-item">Ability Score</div>
                       <div className="flex-item">Ability Modifier</div>
                       <div className="flex-item">Temp. Adjustment</div>
                       <div className="flex-item">Temp. Modifier</div>
                   </div>
               </div>
               <div className="flex-item">
                   {
                       ["STR", "DEX", "CON", "INT", "WIS", "CHA"].map((key) =>{
                           return(
                               <div className="flex-container">
                                   {/* Ability Name */}
                                   <div className="flex-item">
                                       <ul className="list-unstyled">
                                           <li>{key}</li>
                                           <li><sub>{longNames[key]}</sub></li>
                                       </ul>
                                   </div>
                                   {/* Ability Score */}
                                   <div className="flex-item">
                                       <input type="number"
                                              value={ scores[key] }
                                              name={key}
                                              onChange={this.handleChange}
                                              alt="base"
                                       />
                                   </div>
                                   {/* Ability Mod */}
                                   <div className="flex-item">
                                       <text>{ mods[key] >= 0? "+":"" }{ mods[key] }</text>
                                   </div>
                                   {/* Temp. Adj */}
                                   <div className="flex-item">
                                       <input type="number"
                                              value={ temp_adjustments[key] }
                                              name={key}
                                              onChange={this.handleChange}
                                              alt="temp"
                                       />
                                   </div>
                                   {/* Temp. Mod */}
                                   <div className="flex-item">
                                       {
                                           temp_adjustments[key] ?
                                               <text>{ temp_mods[key] >= 0? "+":"" }{ temp_mods[key] }</text>
                                               : <text>--</text>
                                       }

                                   </div>
                               </div>
                           )
                       })
                   }
               </div>
           </div>
       )
    }
});

export default Abilities;