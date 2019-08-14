import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { sarchText: "", placeHolder: "Tapez votre film..." }
    };
    render() {
        return (
            <div>
                <input onChange={this.handleChange.bind(this)} placeholder={this.state.placeHolder} />
                <p>{this.state.serchText}</p>
            </div>
        )
    }
    handleChange(event) {
        this.setState({ serchText: event.target.value });
    }
}
export default SearchBar;
