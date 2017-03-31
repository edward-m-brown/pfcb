/* Should Levels manage all this stuff, or split it off into other components to manage?
 * what does a class need to render?
 * classes should be responsible for managing character['Levels']['Class_Levels'] state.
 * classes should also be responsible for managing BAB, Saves. These are both derived attributes, and thus
 don't need to be stored in the DB.
 * classes should manage
 * classes should add any special abilities and/or class features that they grant to
 character['Special_Abilities'], if the abilities are not already present, or if the magnitude of a present
 ability becomes increased. (These kind of functions maybe should be optional. Would be very irritating
 to someone with a homebrew character, or with alternate class features, if the app kept adding abilities
 that weren't applicable)
 * popup (modal) for adding classes
 * popup (modal) for looking up class info?
 */
var Levels = React.createClass({
   render(){
       return (
           <div className="flex-container">
               <Classes classes={this.props.baseClasses}/>
           </div>
       )
   }
});

export default Levels;