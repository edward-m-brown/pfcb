var $ = require('jquery');
import CharacterSheet from './CharacterSheet'
var CharacterBuilder = React.createClass({
    getInitialState: function() {
        return({
            cur_char: null,
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
                cur_char: null,
                characters: characters? characters: null
            });
        });
    },
    selectCharacter: function(event) {
        // function for setting the cur_char state
        console.log("Setting cur_char to index " + parseInt(event.target.value))
        this.setState({
            cur_char: this.state.characters[parseInt(event.target.value)]
        })
    },
    deselectCharacter: function() {
        // function for unsetting cur_char state(getting back to characters menu)
        console.log("Unsetting character " + this.state.cur_char["Name"] + "!")
        this.setState({
            cur_char: null
        })
    },
    addCharacter: function(event) {
        // function for starting a new character sheet
        console.log(event.target)

    },
    updateCharacter: function(key, json) {
        this.state.cur_char[key] = json // I dunno, something like this
                                        // cur_char should be selected in this component, and should serve as the
                                        // definitive character state. All child components should only edit their
                                        // chunk of cur_char in their internal state, and should update it whenever the
                                        // user exits the component, or when a 'submit' button is clicked.
    },
    // <CharacterSheet character = cur_char/> eventually, render should return this. For now, return a list of character
    // names, so we know json is being transferred properly
    render: function() {
        let that = this
        if(this.state.cur_char){
            return(
                <div>
                    <CharacterSheet character={this.state.cur_char}
                                    updateCharacter={this.updateCharacter}
                                    deselectCharacter={this.deselectCharacter}
                    />
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
