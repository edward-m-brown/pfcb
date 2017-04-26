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
        this.setState({info: ''});
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
        let info = this.state.info;
        if(prevState && (prevState.info != info) && (info != '') && !this.state.hideSearch)
            this.toggleSearch()
    },
    render() {
        let names = Array.isArray(this.props.objects)
            ? this.props.objects.map((object)=>{return object["Name"]})
            : Object.keys(this.props.objects);
        let objects = this.props.objects;
        let that = this;
        let listObjects = (managerName, objName, objs)=>{
            switch(managerName) {
                case 'classManager':
                    return (
                        <div>
                            <div className="col-xs-5 col-sm-4 col-md-2">
                                <b>{objName}:</b>
                            </div>
                            <div className="col-xs-1 col-sm-1 col-md-1">
                                <input type="number" value={objs[objName]} name={objName} className=""
                                    onChange={that.props.update} style={{width: 40}}/>
                            </div>
                        </div>

                    );
                case 'featManager':
                    return (
                        <div className="col-xs-6 col-sm-5 col-md-3">
                            <b>{objName}</b>
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
                        <div className="modal-body">
                            <div className="container col-xs-12" style={{padding: "10px"}}>
                                {this.state.info
                                        ? <Info objects={this.props.dbObjects} infoFor={this.state.info}
                                              setInfo={this.setInfo} setHide={this.setHide}
                                              labelName={this.props.labelName}/>
                                        : <ul className="list-unstyled">
                                            {names.map((name, index) => {
                                                return (
                                                    <li className="row">
                                                        {/* Probably want to re-think how this little section is populated. */}
                                                        {listObjects(this.props.managerName, name, objects)}
                                                        <button onClick={this.props.remove} data-name={name}
                                                                data-index={index}
                                                                className="col-xs-2 col-sm-1 col-md-1"
                                                                title={"Remove " + this.props.labelName}>
                                                            <span className="glyphicon glyphicon-remove-sign"
                                                                data-name={name} data-index={index}/>
                                                        </button>
                                                        <button data-name={name} onClick={this.setInfo}
                                                            className="col-xs-2 col-sm-1 col-md-1"
                                                            title={"Show " + this.props.labelName + " Reference"}>
                                                            <span className="glyphicon glyphicon-book" data-name={name}/>
                                                        </button>
                                                    </li>
                                                )
                                            }, this)}
                                        </ul>
                                    }
                            </div>
                            <br/>
                            <hr style={{border: "double"}}/>
                            <button onClick={this.toggleSearch}>
                                {this.state.hideSearch? "Show searchbar": "Hide searchbar"}
                            </button>
                            <Search objects={this.props.dbObjects} setInfo={this.setInfo} add={this.props.add}
                                labelName={this.props.labelName} hideSearch={this.state.hideSearch}/>
                        </div>
                        <div className="modal-footer">
                            {this.state.info
                                ? <button type="button" className="btn btn-default"
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
