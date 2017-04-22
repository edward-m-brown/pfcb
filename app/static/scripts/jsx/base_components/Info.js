/**
 * Created by edward on 4/4/17.
 */
const Info = React.createClass({
    showHtml(html){
        return {__html: html}
    },
    resetManager(e) {
        this.props.setInfo(e);
        this.props.setHide(false);
    },
    render() {
        return (
            <div>
                {this.props.objects[this.props.infoFor]
                    ? <div className=""
                           dangerouslySetInnerHTML={this.showHtml(this.props.objects[this.props.infoFor]['Html'])}/>
                    : <h6>No information for object {this.props.infoFor}</h6>}
                {this.props.setInfo
                    ? <button onClick={this.resetManager} data-name="" title={"Back to " + this.props.labelName + " Manager"}>
                        <span data-name="" className="glyphicon glyphicon-circle-arrow-left"/>
                    </button>
                    : ''}

            </div>
        )
    }
});

export default Info;
