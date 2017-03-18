var $ = require('jquery');
import CharacterSheet from './CharacterSheet'
var CharacterBuilder = React.createClass({
    getInitialState: function() {
        return({
            curChar: null,
            characters: []
        });
    },
    componentWillMount: function(){
        let characters;
        let that = this;
        $.get("/get-user-characters", function(user_chars){
            characters = JSON.parse(user_chars);
            console.log("Data Loaded: " + user_chars);
            that.setState({
                curChar: null,
                characters: characters? characters: null
            });
        });
    },
    selectCharacter: function(event) {
        // function for setting the curChar state
        console.log("Setting curChar to index " + parseInt(event.target.value))
        this.setState({
            curChar: this.state.characters[parseInt(event.target.value)]
        })
    },
    addCharacter: function(event) {
        // function for starting a new character sheet
        console.log(event.target)

    },
    updateCharacter: function(key, json) {
        this.state.curChar[key] = json // I dunno, something like this
                                        // curChar should be selected in this component, and should serve as the
                                        // definitive character state. All child components should only edit their
                                        // chunk of curChar in their internal state, and should update it whenever the
                                        // user exits the component, or when a 'submit' button is clicked.
    },
    // <CharacterSheet character = curChar/> eventually, render should return this. For now, return a list of character
    // names, so we know json is being transferred properly
    render: function() {
        let that = this
        if(this.state.curChar){
            return(
                <div>
                    <CharacterSheet character={this.state.curChar} updateCharacter={this.updateCharacter}/>
                </div>
            )
        } else {
            return(
                <div id="character-select">
                    Select a character<br/>
                    <ul>
                        {
                            this.state.characters
                                ? this.state.characters.map(function(character, index) {
                                    return (
                                            <table className="table table-striped">
                                                <tr>
                                                    <th>Name</th>
                                                    {Object.keys(character["Description"]).map(function(key) {
                                                        return <th>{ key }</th>
                                                    })}
                                                </tr>
                                                <tr>
                                                    <td>{ character["Name"] }</td>
                                                    {Object.keys(character["Description"]).map(function(key) {
                                                        return <td>{ character["Description"][key] }</td>
                                                    })}
                                                    <td>
                                                        <button value={index} onClick={that.selectCharacter}>Edit</button>
                                                    </td>
                                                </tr>
                                            </table>
                                    );
                                })

                                : <li>No Characters Loaded</li>
                        }
                    </ul>
                    <button onClick={this.addCharacter}>New Character</button>
                </div>
            )
        }
    }
});

ReactDOM.render(
    <CharacterBuilder/>,
    document.getElementById('character-builder')
);
