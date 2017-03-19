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
        this.props.update(event.target.name, parseInt(event.target.value))
    },
    handleBlur(event) {

    },
    render() {
       let scores = this.props.abilityScores;
       let mods = this.props.abilityMods;
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
                       Object.keys(scores).map((key) =>{
                           return(
                               <tr>
                                   <td>
                                       <ul className="list-unstyled">
                                           <li>{key}</li>
                                           <li><sub>{longNames[key]}</sub></li>
                                       </ul>
                                   </td>
                                   <td>
                                       <input type="number"
                                              value={ scores[key] }
                                              name={key}
                                              onChange={this.handleChange}
                                       />
                                   </td>
                                   <td>
                                       <text>{ mods[key] >= 0? "+":"" }{ mods[key] }</text>
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