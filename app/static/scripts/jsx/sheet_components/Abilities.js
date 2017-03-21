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
        let isTemp = event.target.alt == "temp"? true: false;
        this.props.update(event.target.name, parseInt(event.target.value), isTemp)
    },
    handleBlur(event) {

    },
    render() {
       let scores = this.props.abilityScores;
       let mods = this.props.abilityMods;
       let temp_adjustments = this.props.tempAdjustments;
       let temp_mods = this.props.tempMods;
       return(
           <div className="table-responsive">
               <table className="table">
                   <tr>
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
                                   <td>
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
                                   <td>
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