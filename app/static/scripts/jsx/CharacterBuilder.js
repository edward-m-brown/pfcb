var $ = require('jquery');
import CharacterSheet from './CharacterSheet'

// helpers
const default_char = {
    'Name': 'Unknown Hero',
    'Description' : {
        'Alignment': null,
        'Deity': 'N/A',
        'Race': null,
        'Size': null,
        'Gender': null,
        'Age': 0,
        'Height': '',
        'Weight': '',
        'Hair': '',
        'Eyes': ''
    },
    'Levels': {
        'Exp': 0,
        'Class_Levels': {}
    },
    'Ability_Scores': {
        'base': {
            'STR': 8,
            'DEX': 8,
            'CON': 8,
            'INT': 8,
            'WIS': 8,
            'CHA': 8
        },
        'temp': {
            'STR': 0,
            'DEX': 0,
            'CON': 0,
            'INT': 0,
            'WIS': 0,
            'CHA': 0
        },

    },
    'Movement': {
        'Base': 0,
        'Fly': 0,
        'Swim': 0,
        'Climb': 0,
        'Burrow': 0
    },
    'Feats': [],
    'Special_Abilities' : {
        'Abilities': [],
        'Class_Features': []
    },
    'Spells': {
        'Known': {
        },
        'Prepared': {
        }
    }
}

function throw_error(message) {
    throw new Error(message);
}

var CharacterBuilder = React.createClass({
    getInitialState: function() {
        return({
            cur_char: null,
            characters: [],
            char_index: -1
        });
    },
    componentWillMount: function(){
        let characters, classes;
        let that = this;
        $.get("/get-user-characters", function(user_chars){
            characters = JSON.parse(user_chars);
            console.log("Data Loaded: " + user_chars);
            that.setState({
                cur_char: null,
                char_index: -1,
                characters: characters? characters: []
            });
        });
        $.get("/get-base-classes", function(base_classes){
            classes = JSON.parse(base_classes);
            console.log("Data Loaded: " + classes)
            that.setState({
               base_classes: classes
            });
        });
    },
    refreshCharacters(){

    },
    selectCharacter: function(event) {
        // function for setting the cur_char state
        let char_index = parseInt(event.target.value);
        console.log("Setting cur_char to index " + char_index)
        this.setState({
            cur_char: this.state.characters[char_index],
            char_index: char_index
        });
    },
    deselectCharacter: function() {
        // function for unsetting cur_char state(getting back to characters menu)
        console.log("Unsetting character " + this.state.cur_char["Name"] + "!")
        this.setState({
            cur_char: null,
            char_index: -1
        })
    },
    deleteCharacter(event){
        // launch confirm dialog here
        if(!confirm("Do you really want to delete the character " + event.target.name + "?"))
            return
        let index = parseInt(event.target.value);
        let characters = Object.assign([], this.state.characters);
        if(index != 0 && index != characters.length - 1){
            characters = characters.slice(0,index).concat(characters.slice(index, characters.length-1));
        } else if(index == characters.length - 1) {
            characters.pop()
        } else {
            characters.shift()
        }
        // delete from backend here
        this.putCharacters(characters);
    },
    addCharacter: function(event) {
        // function for starting a new character sheet
        console.log(event.target)
        let characters = Object.assign([], this.state.characters);
        characters.push(Object.assign({}, default_char));
        this.setState({characters: characters});
    },
    updateCharacter(character, index=this.state.char_index) {
        let characters = Object.assign([], this.state.characters);
        index >= 0
            ? characters[index] = character
            : throw_error("char_index not set!");
        this.putCharacters(characters)
    },
    putCharacters(characters) {
        let that = this;
        $.ajax({
            url: "/save-characters",
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(characters),
            success: function (user_chars) {
                characters = JSON.parse(user_chars);
                console.log("Data Loaded: " + user_chars);
                that.setState({
                    characters: characters
                })
            }
        });
    },
    render: function() {
        let that = this;
        if(this.state.cur_char){
            return(
                <div>
                    <CharacterSheet character={this.state.cur_char}
                                    updateCharacter={this.updateCharacter}
                                    deselectCharacter={this.deselectCharacter}
                                    baseClasses={this.state.base_classes}
                    />
                </div>
            )
        } else {
            return(
                <div id="character-select">
                    Select a character<br/>
                    {
                        this.state.characters.length
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
                                                    <button value={index}
                                                            onClick={that.selectCharacter}>Edit</button>
                                                </td>
                                                <td>
                                                    <button value={index} name={character["Name"]}
                                                            onClick={that.deleteCharacter}> Delete </button>
                                                </td>
                                            </tr>
                                        </table>
                                );
                            })

                            : <h6>No Characters Loaded</h6>
                    }
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
