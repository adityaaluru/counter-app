import React, { Component } from "react";

class SearchBox extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <input
        type="text"
        className="form-control my-3"
        name="query"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    );
  }
}

export default SearchBox;
