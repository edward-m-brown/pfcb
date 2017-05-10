import Search from './Search'
import Info from './Info'

var Manager = React.createClass({
    getInitialState() {
        return {
            info: '',
            hideSearch: false
        }
    },
    componentWillMount(){
        // ajax here, if needed
    },
    resetState() {
        this.setState({info: '', hideSearch: false});
    },
    setInfo(e) {
        this.setState({info: e.target.name? e.target.name : e.target.dataset.name});
    },
    toggleSearch() {
        this.setState({hideSearch: !this.state.hideSearch});
    },
    setHide(hideSearch) {
        this.setState({hideSearch: hideSearch})
    },
    componentDidUpdate(prevProps, prevState) {

    },
    render() {
        let names = Array.isArray(this.props.objects)
            ? this.props.objects.map((object)=>{return object["Name"]})
            : Object.keys(this.props.objects);
        let objects = this.props.objects;
        let that = this;
        let listObject = (managerName, objName, objs)=>{
            switch(managerName) {
                case 'classManager':
                    return (
                        <div className="flex-container">
                            <a data-name={objName} onClick={this.setInfo}>
                                <b data-name={objName}>{objName}:</b>
                            </a>
                            <div className="">
                                <input type="number" value={objs[objName]} name={objName} className=""
                                    onChange={that.props.update} style={{width: 40}}/>
                            </div>
                        </div>

                    );
                case 'featManager':
                    return (
                        <div className="flex-container">
                            <a data-name={objName} onClick={this.setInfo}>{objName}</a>
                            <textarea />
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
                                <div className="flex-container-col" style={this.state.info? {display: "none"}: {}}>
                                    {names.map((name, index) => {
                                        return (
                                            <div className="flex-container flex-wrap">
                                                {/* Probably want to re-think how this little section is populated. */}
                                                {listObject(this.props.managerName, name, objects)}
                                                <button onClick={this.props.remove} data-name={name}
                                                        data-index={index} className="btn btn-xs btn-danger"
                                                        title={"Remove " + this.props.labelName}>
                                                    <span className="glyphicon glyphicon-remove-sign"
                                                        data-name={name} data-index={index}/>
                                                </button>
                                            </div>
                                        )
                                    }, this)}
                                </div>
                            </div>
                            <br/>
                            <hr style={{border: "double"}}/>
                            <button onClick={this.toggleSearch} className="btn btn-sm btn-primary">
                                {this.state.hideSearch? "Show searchbar": "Hide searchbar"}
                            </button>
                            <Search objects={this.props.dbObjects} setInfo={this.setInfo} add={this.props.add}
                                labelName={this.props.labelName} hideSearch={this.state.hideSearch}/>
                        </div>
                        <div className="modal-footer">
                            {this.state.info
                                ? <button type="button" className="btn btn-primary"
                                    onClick={this.resetState}>
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
