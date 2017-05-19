/**
 * Created by edward on 4/13/17.
 */
import Manager from '../base_components/Manager'
import Reference from '../base_components/Reference'
import Note from '../base_components/Note'

const Feats = React.createClass({
    getInitialState() {
        return {info: ''}
    },
    addFeat(e) {
        // can add test to see if character qualifies for feats?
        let featName = e.target.dataset.name;
        if(!featName) return;
        this.props.updateCharacter('feats', featName);
    },
    removeFeat(e) {
        let featIndex = parseInt(e.target.dataset.index);
        if(!(featIndex || featIndex === 0)) return;
        this.props.updateCharacter('remove_feat', featIndex);
    },
    setInfo(e) {
        this.setState({info: e.target.dataset.name, noSearch: true});
    },
    updateNote(e) {
        let note = e.target.value;
        let belongsTo = parseInt(e.target.dataset.index);
        this.props.updateCharacter('feat_note', note, belongsTo)
    },
    render() {
        let featNames = this.props.characterFeats.map((feat)=>{ return feat["Name"] });
        return (
            <div className="col-md-6 bordered">
                <h3 className="field-block">
                    Feats
                    <button data-toggle="modal" data-target="#featManager" title="Edit Feats"
                        className="btn btn-xs btn-primary">
                        <span className="glyphicon glyphicon-pencil"/>
                    </button>
                </h3>
                {featNames.length
                    ?   <div>
                            {featNames.map((featName, index)=>{
                                return (
                                    <div className="col-xs-6 col-md-4">
                                        <div className="flex-container">
                                            <a data-toggle="modal" data-target="#featReference"
                                                data-name={featName} onClick={this.setInfo}
                                                title={"Show " + {featName} + " Reference"}>
                                                {featName}
                                            </a>
                                            {this.props.characterFeats[index]['Notes']
                                                ? <span className="glyphicon glyphicon-info-sign" data-toggle="popover"
                                                      title="Notes"
                                                      data-content={this.props.characterFeats[index]['Notes']}/>
                                                : ''}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    :   <div>
                            <button data-toggle="modal" data-target="#featManager" title="Add Feats"
                                className="btn btn-sm btn-success">
                                Add Feats
                            </button>
                        </div>
                }
                <Reference referenceName="featReference" labelName="Feat" dbObjects={this.props.dbFeats}
                    info={this.state.info}/>
                <Manager managerName="featManager" labelName="Feat" objects={this.props.characterFeats}
                    dbObjects={this.props.dbFeats} add={this.addFeat} remove={this.removeFeat} update={this.updateNote}/>
            </div>
        );
    }
});

export default Feats;
