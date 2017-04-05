/**
 * Created by edward on 4/4/17.
 */
const Info = React.createClass({
    showHtml(html){
        return {__html: html}
    },
    render() {
        return (
            this.props.objects[this.props.infoFor]
                ? <div className={this.props.infoStyle? this.props.infoStyle: ""}
                       dangerouslySetInnerHTML={this.showHtml(this.props.objects[this.props.infoFor]['Html'])}/>
                : <h6>Does not exist; create one?</h6>
        )
    }
});

export default Info;
