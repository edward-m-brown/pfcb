/**
 * Should maybe take the modal stuff out ot ClassManager and put it here. Will need very similar components for
 * Feats, Spells, Equipment, Gear, etc.
 */
import Search from './Search'
import Info from './Info'

var Manager = React.createClass({
    getInitialState() {
        return {
            info: ''
        }
    },
    add(e) {
        console.log("add: " + e.target.name)
        this.props.add(e.target.name);
    },
    componentWillMount(){
        // ajax here, if needed
    },
    resetState() {
        this.setState({
            info: ''
        })
    },
    setInfo(e) {
        this.setState({
            info: e.target.name
        })
    },
    render() {
        let names = Object.keys(this.props.objects);
        let objects = this.props.objects;
        let that = this;
        let listObjects = (managerName, objName, objs)=>{
            switch(managerName) {
                case 'classManager':
                    return (
                        <input type="number" value={objs[objName]} name={objName}
                               onChange={that.props.update} style={{width: 40}}/>
                    )
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
                            {this.state.info
                                ? <Info objects={this.props.dbObjects}
                                        infoFor={this.state.info}/>
                                : <ul className="list-unstyled">
                                    {names.map((name) => {
                                        return (
                                            <li>
                                                {name}: {listObjects(this.props.managerName, name, objects)}
                                                <button name={name} onClick={this.props.remove}>Remove</button>
                                                <button name={name} onClick={this.setInfo}>Info</button>
                                            </li>
                                        )
                                    }, this)}
                                </ul>
                            }
                            <hr/>
                            <Search objects={this.props.dbObjects} setInfo={this.setInfo} add={this.add}/>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.resetState}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.resetState}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

});

export default Manager;
