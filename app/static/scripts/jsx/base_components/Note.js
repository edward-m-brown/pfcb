/**
 * Created by edward on 4/15/17.
 */
const Note = React.createClass({
    getInitialState() {
        return { show: true, disabled: true }
    },
    toggleDisabled() {
        this.setState({disabled: !this.state.disabled});
    },
    toggleShow() {
        this.setState({show: !this.state.show});
    },
    render() {
        return (
            <div className="flex-container">
                <textarea value={this.props.note} onChange={this.props.update} data-index={this.props.index}
                    disabled={this.state.disabled} style={this.state.show? {}: {display: "none"}}
                    aria-describedby={this.props.noteName} className="flex-item"/>
                <div className="flex-item flex-container-col">
                    <button className="flex-item" onClick={this.toggleDisabled} title={this.state.disabled
                        ? "Edit Note": "Save Note"} style={this.state.show? {}: {display: "none"}}>
                        <span className={this.state.disabled
                            ? "glyphicon glyphicon-pencil"
                            : "glyphicon glyphicon-floppy-save"}/>
                    </button>
                    <button className="flex-item" onClick={this.toggleShow} title={this.state.show
                        ? "Hide Note": "Show Note"}>
                        <span className={this.state.show
                            ? "glyphicon glyphicon-eye-close"
                            : "glyphicon glyphicon-eye-open"}/>

                    </button>
                </div>
                <span id={this.props.noteName} className="help-block">{this.props.noteName}</span>
            </div>
        );
    }
});

export default Note;