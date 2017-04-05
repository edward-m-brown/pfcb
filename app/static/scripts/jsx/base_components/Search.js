/**
 * Created by edward on 4/4/17.
 */
const Search = React.createClass({
    getInitialState(){
        return { search: '' };
    },
    handleChange(e) {
        this.setState({
            search: e.target.value
        })
    },
    render() {
        return(
            <div className={this.props.searchStyle? this.props.searchStyle: ""}>
                <span id="search-bar" className="help-block">Search</span>
                <input  className="form-control" aria-describedby="search-bar"
                        type="text" value={this.state.search}
                        name="search-bar"
                        onChange={this.handleChange} />
                <div className="container">
                    { Object.keys(this.props.objects).map((name)=>{
                        if(this.state.search == '' || name.toLowerCase().match(this.state.search.toLowerCase())) {
                            return (
                                <div className="row">
                                    <div className="col-xs-6 col-sm-5 col-md-3"> {name} </div>
                                    <button className="col-xs-3 col-sm-2 col-md-1" onClick={this.props.add} name={name}>Add</button>
                                    <button className="col-xs-3 col-sm-2 col-md-1" onClick={this.props.setInfo} name={name}>Info</button>
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
