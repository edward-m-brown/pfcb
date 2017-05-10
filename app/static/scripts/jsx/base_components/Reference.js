/**
 * Created by edward on 4/15/17.
 */
import Search from './Search'
import Info from './Info'

var Reference = React.createClass({
    render() {
        return (
            <div className="modal fade" id={this.props.referenceName} tabindex="-1" role="dialog" aria-abelledby={this.props.labelName}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title" id={this.props.labelName}>PFCB {this.props.labelName} Reference</h4>
                        </div>
                        <div className="modal-body" id={this.props.referenceName + "-body"}>
                            <div className="container col-xs-12" style={{padding: "10px"}}>
                                <span id={this.props.referenceName + "-top"}/>
                                <Info objects={this.props.dbObjects} infoFor={this.props.info}
                                    idName={this.props.referenceName + "-body"}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

});

export default Reference;

