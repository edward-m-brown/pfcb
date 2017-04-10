/**
 * Created by edward on 4/4/17.
 */
const Search = React.createClass({
    getInitialState(){
        return { search: ''};
    },
    handleChange(e) {
        this.setState({
            search: e.target.value
        })
    },
    render() {
        let objectNames = Object.keys(this.props.objects).sort()
        return(
            <div className="">
                <div className="">
                    <span id="search-bar" className="help-block">Search</span>
                    <input  className="form-control" aria-describedby="search-bar"
                            type="text" value={this.state.search}
                            name="search-bar"
                            onChange={this.handleChange} />
                    <button className="" onClick={this.props.add}
                            name={this.state.search} title={"Add " + this.props.labelName}>
                        <span className="glyphicon glyphicon-plus-sign" data-name={this.state.search}></span>
                    </button>
                    <button className="" onClick={this.props.setInfo}
                            name={this.state.search} title={"Show " + this.props.labelName + " Reference"}>
                        <span className="glyphicon glyphicon-book" data-name={this.state.search}></span>
                    </button>
                </div>
                <br/>
                <div className="container">
                    { objectNames.map((name)=>{
                        if(this.state.search == '' || name.toLowerCase().match(this.state.search.toLowerCase())) {
                            return (
                                <div className="row">
                                    <div className="col-xs-6 col-sm-5 col-md-3"> {name} </div>
                                    <button className="col-xs-3 col-sm-2 col-md-1" onClick={this.props.add}
                                            name={name} title={"Add " + this.props.labelName}>
                                        <span className="glyphicon glyphicon-plus-sign" data-name={name}></span>
                                    </button>
                                    <button className="col-xs-3 col-sm-2 col-md-1" onClick={this.props.setInfo}
                                            name={name} title={"Show " + this.props.labelName + " Reference"}>
                                        <span className="glyphicon glyphicon-book" data-name={name}></span>
                                    </button>
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
