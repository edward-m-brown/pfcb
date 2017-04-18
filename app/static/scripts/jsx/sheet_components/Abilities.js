var $=require('../../../bower_components/jquery/dist/jquery');
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
       let inputStyle = {width:40, height:40, textAlign: "center"}
       return(
           <div className="col-xs-12 col-md-6 bordered">
               <h2 style={{textAlign: "center"}}> Abilities </h2>
               <table className="table table-bordered">
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
                                       <ul className="list-unstyled field-block">
                                           <li>{key}</li>
                                           <li><sub>{longNames[key]}</sub></li>
                                       </ul>
                                   </td>
                                   {/* Ability Score */}
                                   <td style={{alignContent: "center"}}>
                                       <input type="number" value={ scores[key] } name={key}
                                           onChange={this.handleChange} style={inputStyle} alt="base"/>
                                   </td>
                                   {/* Ability Mod */}
                                   <td style={{alignContent: "center"}}>
                                       <input type="text" value={mods[key] >= 0? "+" + mods[key]: "" + mods[key]}
                                           disabled={true} style={inputStyle}/>
                                   </td>
                                   {/* Temp. Adj */}
                                   <td style={{alignContent: "center"}}>
                                       <input type="number" value={ temp_adjustments[key] } name={key}
                                           onChange={this.handleChange}  style={inputStyle} alt="temp"
                                       />
                                   </td>
                                   {/* Temp. Mod */}
                                   <td style={{alignContent: "center"}}>
                                       <input type="text" disabled={true} style={inputStyle}
                                           value={ temp_mods[key] >= 0? "+" + temp_mods[key]:"" + temp_mods[key]}/>
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