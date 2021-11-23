import React, { Component } from "react";

class Searchbox extends Component {
  render() {
    return (
      <input
        type="text"
        name="query"
        className="form-control my-3"
        placeholder="Search..."
        value={this.props.value}
        onChange={(e) => this.props.onChange(e.currentTarget.value)}
      ></input>
    );
  }
}

export default Searchbox;
