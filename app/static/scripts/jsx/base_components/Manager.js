import Search from './Search'
import Info from './Info'
const $ = require('../../../bower_components/jquery/dist/jquery.min');
const Manager = React.createClass({
    getInitialState() {
        return {
            info: '',
            hide_search: false,
            jump_id: ''
        }
    },
    componentWillMount(){
        // ajax here, if needed
    },
    resetState() {
        this.setState({info: '', hide_search: false, jump_id: ''});
    },
    setInfo(e) {
        let info = e.target.dataset.name;
        let jumpID = e.target.dataset.id? e.target.dataset.id: this.state.jump_id;
        // console.log("setting jump_id: " + jumpID)
        this.setState({info: info, jump_id: jumpID});
    },
    toggleSearch() {
        this.setState({hide_search: !this.state.hide_search, jump_id: ''}); // if you hide the search, you wipe out jump_id!!!
    },
    setHide(hide_search) {
        this.setState({hide_search: hide_search})
    },
    componentDidUpdate(prevProps, prevState) {
        if(this.state.info == "" && this.state.jump_id) {
            let jqJump = $('#'+this.state.jump_id);
            let scrollTop = $('#'+this.props.managerName+"-body").scrollTop();
            let jumpPosition = jqJump.position().top + scrollTop
            // console.log("jumping to position: " + jumpPosition);
            $("#"+this.props.managerName+"-body").animate({ scrollTop: jumpPosition }, 'fast');
        }
    },
    render() {
        let names = Array.isArray(this.props.objects)
            ? this.props.objects.map((object)=>{return object["Name"]})
            : Object.keys(this.props.objects);
        let objects = this.props.objects;
        let that = this;
        let listObject = (managerName, objName, objs, index)=>{
            let id=[managerName, objName, index].join("-");
            switch(managerName) {
                case 'classManager':
                    return (
                        <div className="" id={id}>
                            <a data-name={objName} onClick={this.setInfo} data-id={id} className="col-xs-3 no-padding">
                                <b data-name={objName} data-id={id}>{objName}:</b>
                            </a>
                            <input type="number" value={objs[objName]} name={objName} className="col-xs-3 no-padding"
                                onChange={that.props.update} style={{width: 40}}/>
                            <button onClick={that.props.remove} data-name={objName}
                                    onMouseOver={console.log('mouseOver '+objName)} onMouseOut={console.log('mouseOut '+objName)}
                                    data-index={index} className="btn btn-xs btn-danger col-xs-1 no-padding"
                                    title={"Remove " + objName}>
                                <span className="glyphicon glyphicon-remove-sign" data-name={objName}/>
                            </button>
                        </div>

                    );
                case 'featManager':
                    return (
                        <div className="" id={id}>
                            <a className="col-xs-5 no-padding" data-name={objName} onClick={this.setInfo}>{objName}</a>
                            <div className="col-xs-6 no-padding">
                                <textarea value={objs[index]["Notes"]} onChange={that.props.update}
                                    aria-describedby={id + "-notes"}/>
                                <span className="help-block" id={id + "-notes"}> Notes </span>
                            </div>
                            <button onClick={that.props.remove} data-name={objName}
                                    onMouseOver={console.log('mouseOver '+objName)} onMouseOut={console.log('mouseOut '+objName)}
                                    data-index={index} className="btn btn-xs btn-danger col-xs-1 no-padding"
                                    title={"Remove " + objName}>
                                <span className="glyphicon glyphicon-remove-sign"
                                    data-name={objName} data-index={index}/>
                            </button>
                        </div>
                    );
            }
            
        }
        return (
            <div className="modal fade" id={this.props.managerName} tabindex="-1" role="dialog" aria-abelledby={this.props.labelName}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.resetState}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title" id={this.props.labelName}>PFCB {this.props.labelName} Manager</h4>
                        </div>
                        <div className="modal-body" id={this.props.managerName + "-body"}>
                            <div className="container col-xs-12" style={{padding: "10px"}}>
                                <div style={this.state.info? {}: {display: "none"}}>
                                    <Info objects={this.props.dbObjects} infoFor={this.state.info}
                                          setInfo={this.setInfo} labelName={this.props.labelName}
                                          idName={this.props.managerName + "-body"}/>
                                </div>
                                <div className="" style={this.state.info? {display: "none"}: {}}>
                                    {names.map((name, index) => {
                                        return (
                                            <div className="flex-container-col">
                                                {/* Probably want to re-think how this little section is populated. */}
                                                {listObject(this.props.managerName, name, objects, index)}
                                            </div>
                                        )
                                    }, this)}
                                </div>
                            </div>
                            <br/>
                            <hr style={{border: "double"}}/>
                            <button onClick={this.toggleSearch} className="btn btn-sm btn-primary">
                                {this.state.hide_search? "Show searchbar": "Hide searchbar"}
                            </button>
                            <Search objects={this.props.dbObjects} setInfo={this.setInfo} add={this.props.add}
                                labelName={this.props.labelName} hideSearch={this.state.hide_search}/>
                        </div>
                        <div className="modal-footer">
                            {this.state.info
                                ? <button type="button" className="btn btn-primary"
                                    data-name="" onClick={this.setInfo}>
                                    Back to {this.props.labelName} Manager
                                  </button>
                                : ''
                            }

                            <button type="button" className="btn btn-default" data-dismiss="modal"
                                onClick={this.resetState}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

});

export default Manager;
