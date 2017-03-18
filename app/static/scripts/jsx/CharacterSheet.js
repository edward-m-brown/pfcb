var $=require('jquery');
var CharacterSheet = React.createClass({
    render: function(){
        let that = this
        return (
            <p>
                { Object.keys(this.props.character).map(function (key) {
                    return <h1>{key}</h1>
                    })
                }
            </p>
        )
    }
});

export default CharacterSheet;

