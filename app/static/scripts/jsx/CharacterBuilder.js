import CharacterSheet from './CharacterSheet'
import character_template from './base_components/helpers'


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
    componentDidMount: function(){
        let characters, classes, feats, skills;
        let that = this;
        $.get("/get-user-characters", function(user_chars){
            characters = JSON.parse(user_chars);
            // console.log("Data Loaded: " + user_chars);
            that.setState({
                characters: characters? characters: []
            });
        });
        $.get("/get-base-classes", function(base_classes){
            classes = JSON.parse(base_classes);
            // console.log("Data Loaded: " + classes)
            that.setState({
               base_classes: classes
            });
        });
        $.get("/get-feats", function(feats){
            feats = JSON.parse(feats);
            // console.log("Data Loaded: " + feats);
            that.setState({
                feats: feats
            });
        });
        $.get("/get-skills", function(skills){
            skills = JSON.parse(skills);
            // console.log("Data Loaded: " + skills);
            that.setState({
                skills: skills
            });
        });
    },
    refreshCharacters(){

    },
    selectCharacter: function(event) {
        // function for setting the cur_char state
        let char_index = parseInt(event.target.value);
        // console.log("Setting cur_char to index " + char_index)
        this.setState({
            cur_char: this.state.characters[char_index],
            char_index: char_index
        });
    },
    deselectCharacter: function() {
        // function for unsetting cur_char state(getting back to characters menu)
        // console.log("Unsetting character " + this.state.cur_char["Name"] + "!")
        this.setState({
            cur_char: null,
            char_index: -1
        })
    },
    deleteCharacter(event){
        // launch confirm dialog here
        if(!confirm("Do you really want to delete the character " + event.target.name + "?"))
            return;
        let index = parseInt(event.target.value);
        let characters = $.extend(true, [], this.state.characters);
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
        let characters = $.extend(true, [], this.state.characters);
        let index = characters.push($.extend(true, {}, character_template)) - 1;
        this.saveCharacters(characters[index], index)
    },
    saveCharacters(character, index=this.state.char_index) {
        let characters = $.extend(true, [], this.state.characters);
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
                // console.log("Data Loaded: " + user_chars);
                that.setState({
                    characters: characters
                })
            }
        });
    },
    makeRows(characters) {
        return (characters.map(function(character, index) {
            return (
                <tr>
                    <td>{ character["Name"] }</td>
                    <td>{ character["Description"]["Race"] }</td>
                    <td>{ character["Description"]["Alignment"] }</td>
                    <td>
                        { Object.keys(character["Levels"]["Class_Levels"]).map(
                            (className, index) => {
                                return (
                                    <span>
                                        <b>{className}: </b>
                                        {character["Levels"]["Class_Levels"][className]}
                                        {Object.keys(character["Levels"]["Class_Levels"])[index + 1] ? ";" : ""}
                                    </span>
                                )
                            }
                        )}
                    </td>
                    <td>
                        <button value={index}
                                onClick={this.selectCharacter}>Edit
                        </button>
                    </td>
                    <td>
                        <button value={index} name={character["Name"]}
                                onClick={this.deleteCharacter}> Delete
                        </button>
                    </td>
                </tr>
            )
        }, this))
    },
    makeTable(){
        return(
            <table className="table table-responsive">
                <tr>
                    <th>Name</th>
                    <th>Race</th>
                    <th>Alignment</th>
                    <th>Levels</th>
                </tr>
                {this.makeRows(this.state.characters)}
            </table>
        );
    },
    render: function() {
        if(/*this.state.loaded*/true) {
            return(
                <div>
                    <div id="character-select" style={this.state.cur_char? {display: "none"}: {}}>
                        Select a character<br/>
                        {this.state.characters.length
                            ? this.makeTable()
                            : <h6>No Characters Loaded</h6>}
                        <button onClick={this.addCharacter}>New Character</button>
                    </div>
                    {this.state.cur_char
                        ? <div>
                            <CharacterSheet character={this.state.cur_char}
                                            saveCharacter={this.saveCharacters}
                                            deselectCharacter={this.deselectCharacter}
                                            baseClasses={this.state.base_classes}
                                            feats={this.state.feats}
                                            skills={this.state.skills}/>
                        </div>
                        : ''
                    }
                </div>
            );
        } else {
            return <h1>THIS IS TOTALLY A SPINNER!</h1>
        }

    }
});

ReactDOM.render(
    <CharacterBuilder/>,
    document.getElementById('character-builder')
);
