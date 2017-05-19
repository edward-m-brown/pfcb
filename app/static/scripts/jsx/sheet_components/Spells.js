import Manager from '../base_components/Manager'
import Reference from '../base_components/Reference'
const Spells = React.createClass({
    render(){
        return (
            <div className="col-md-6 bordered">
                <h3 className="field-block">
                    Spells
                    <button data-toggle="modal" data-target="#spellsManager" title="Edit Spells"
                            className="btn btn-xs btn-primary">
                        <span className="glyphicon glyphicon-pencil"/>
                    </button>
                </h3>
            </div>
        )
    }
});

export default Spells;