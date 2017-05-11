/**
 * Created by edward on 4/4/17.
 */
const $ = require('../../../bower_components/jquery/dist/jquery.min')
const Search = React.createClass({
    getInitialState(){
        return { search: ''};
    },
    handleChange(e) {
        this.setState({
            search: e.target.value
        })
    },
    highlightField(e){
        let id = "#" + e.target.dataset.id;
        $(id).css("background-color", "lightblue");
    },
    unHighlight(e){
        let id = "#" + e.target.dataset.id;
        $(id).css("background-color", "transparent");
    },
    render() {
        let objectNames = Object.keys(this.props.objects).sort();
        return(
            <div className="" style={this.props.hideSearch? {display: "none"}:{display: "block"}}>
                <div className="">
                    <span id="search-bar" className="help-block">{this.props.labelName} Search</span>
                    <input  className="form-control" aria-describedby="search-bar"
                            type="text" value={this.state.search}
                            name="search-bar"
                            onChange={this.handleChange} />
                    <button className="btn btn-xs btn-success" onClick={this.props.add}
                        data-name={this.state.search} title={"Add " + this.props.labelName + " " + this.state.search}>
                        <span className="glyphicon glyphicon-plus-sign" data-name={this.state.search}/>
                    </button>
                </div>
                <br/>
                <div className="">
                    {/*With filters, this would change to if this.filter and this.filter() would call
                        a filter function passed as props.*/}
                    { objectNames.map((name, index)=>{
                        let idName = this.props.labelName + "-"
                            + name.split(' ').join('-').replace('(','').replace(')','').replace(',','') + "-" + index;
                        if(this.state.search == '' || name.toLowerCase().match(this.state.search.toLowerCase())) {
                            return (
                                <div className="flex-container" style={{justifyContent: "space-between"}} id={idName}>
                                    <a onClick={this.props.setInfo} data-name={name} data-id={idName}> {name} </a>
                                    <div>
                                        <button className="btn-sm btn-success" onClick={this.props.add}
                                            onMouseOver={this.highlightField} onMouseOut={this.unHighlight}
                                            data-name={name} data-id={idName}
                                            title={"Add " + this.props.labelName + " " + name}>
                                            <span className="glyphicon glyphicon-plus-sign" data-name={name}
                                               data-id={idName}/>
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    }, this)}
                </div>
            </div>
        );
    }
});

export default Search;
