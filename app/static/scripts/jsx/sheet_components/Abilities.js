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
           <div>
               <h1 style={{textAlign: "center"}}> Abilities </h1>
               <table className="table">
                   <tr className="table-header">
                       <th>Ability Name</th>
                       <th>Ability Score</th>
                       <th>Ability Modifier</th>
                       <th>Temp. Adjustment</th>
                       <th>Temp. Modifier</th>
                   </tr>
                   {
                       ["STR", "DEX", "CON", "INT", "WIS", "CHA"].map((key) =>{
                           return(
                               <tr>
                                   {/* Ability Name */}
                                   <td>
                                       <ul className="list-unstyled">
                                           <li>{key}</li>
                                           <li><sub>{longNames[key]}</sub></li>
                                       </ul>
                                   </td>
                                   {/* Ability Score */}
                                   <td>
                                       <input type="number"
                                              value={ scores[key] }
                                              name={key}
                                              onChange={this.handleChange}
                                              alt="base"
                                       />
                                   </td>
                                   {/* Ability Mod */}
                                   <td style={{width: 50}}>
                                       <text>{ mods[key] >= 0? "+":"" }{ mods[key] }</text>
                                   </td>
                                   {/* Temp. Adj */}
                                   <td>
                                       <input type="number"
                                              value={ temp_adjustments[key] }
                                              name={key}
                                              onChange={this.handleChange}
                                              alt="temp"
                                       />
                                   </td>
                                   {/* Temp. Mod */}
                                   <td style={{width: 50}}>
                                       <text>{ temp_mods[key] >= 0? "+":"" }{ temp_mods[key] }</text>
                                   </td>
                               </tr>
                           )
                       })
                   }
               </table>
           </div>
       )
    }
});

export default Abilities;