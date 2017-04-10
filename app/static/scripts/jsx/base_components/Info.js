/**
 * Created by edward on 4/4/17.
 */
const Info = React.createClass({
    showHtml(html){
        return {__html: html}
    },
    render() {
        return (
            <div>
                <button onClick={this.props.setInfo} name="" title={"Back to " + this.props.labelName + " Manager"}>
                    <span className="glyphicon glyphicon-circle-arrow-left"></span>
                </button>
                {this.props.objects[this.props.infoFor]
                    ? <div className={this.props.infoStyle ? this.props.infoStyle : ""}
                           dangerouslySetInnerHTML={this.showHtml(this.props.objects[this.props.infoFor]['Html'])}/>
                    : <h6>No information for object {this.props.infoFor}</h6>
                }

            </div>
        )
    }
});

export default Info;
