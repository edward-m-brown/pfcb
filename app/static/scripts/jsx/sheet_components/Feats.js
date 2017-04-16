/**
 * Created by edward on 4/13/17.
 */
import Manager from '../base_components/Manager'
import Reference from '../base_components/Reference'

const Feats = React.createClass({
    getInitialState() {
        return {info: '', noSearch: false}
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
    render() {
        let featNames = this.props.characterFeats.map((feat)=>{ return feat["Name"] });
        return (
            <div className="col-md-6 bordered">
                <h2 style={{textAlign: "center"}}> Feats </h2>
                {featNames.length
                    ?   <div>
                            {featNames.map((featName)=>{
                                return (
                                    <div className="row">
                                        <text className="col-md-4">{featName}</text>
                                        <button data-name={featName} onClick={this.setInfo}
                                            data-toggle="modal" data-target="#featReference"
                                            className="col-xs-2 col-sm-1 col-md-1"
                                            title="Show Feat Reference">
                                            <span className="glyphicon glyphicon-book" data-name={featName}/>
                                        </button>
                                    </div>
                                )
                            })}
                            <button data-toggle="modal" data-target="#featManager" title="Edit Feats">
                                <span className="glyphicon glyphicon-pencil"></span>
                            </button>
                            {/*
                             <button onClick={this.updateStats} title="Update Character">
                                 <span className="glyphicon glyphicon-user"></span>
                                 <span className="glyphicon glyphicon-refresh"></span>
                             </button>
                            */}
                        </div>
                    :   <div>
                            <button data-toggle="modal" data-target="#featManager" title="Add Feats">
                                <span className="glyphicon glyphicon-plus-sign"></span>
                            </button>
                        </div>
                }
                <Reference referenceName="featReference" labelName="Feat" dbObjects={this.props.dbFeats}
                    info={this.state.info}/>
                <Manager managerName="featManager" labelName="Feat" objects={this.props.characterFeats}
                    dbObjects={this.props.dbFeats} add={this.addFeat} remove={this.removeFeat}/>
            </div>
        );
    }
});

export default Feats;
