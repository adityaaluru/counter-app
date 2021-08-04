import React, { Component } from "react";

class ListGroup extends Component {
  getClassName = (currentItemId, selectedGenreId) => {
    if (currentItemId === selectedGenreId) {
      return "list-group-item active";
    } else {
      return "list-group-item";
    }
  };
  render() {
    return (
      <ul className="list-group">
        {this.props.allGenres.map((item) => (
          <li
            key={item._id}
            className={this.getClassName(item._id, this.props.selectedGenre)}
            onClick={() => this.props.onSelectGenre(item._id)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default ListGroup;
