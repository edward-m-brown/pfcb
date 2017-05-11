/**
 * Created by edward on 4/4/17.
 */
const $ = require('../../../bower_components/jquery/dist/jquery.min');
const Info = React.createClass({
    showHtml(html){
        return {__html: html}
    },
    resetManager(e) {
        this.props.setInfo(e);
    },
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.infoFor != nextProps.infoFor
    },
    componentDidUpdate() {
        if(this.props.infoFor) {
            let id = "#"+this.props.idName;
            $(id).animate({ scrollTop: 0 }, 'fast');
        }
    },
    render() {
        return (
            <div id="infoBody">
                {this.props.objects[this.props.infoFor]
                    ? <div className=""
                           dangerouslySetInnerHTML={this.showHtml(this.props.objects[this.props.infoFor]['Html'])}/>
                    : <h6>No information for {this.props.labelName}: {this.props.infoFor}</h6>}
                {this.props.setInfo
                    ? <button onClick={this.resetManager} data-name=""
                          title={"Back to " + this.props.labelName + " Manager"} className="btn btn-sm btn-primary">
                          <span data-name="" className="glyphicon glyphicon-circle-arrow-left"/>
                      </button>
                    : ''}

            </div>
        )
    }
});

export default Info;
