import React, { Component } from "react";

class Likes extends Component {
  render() {
    return (
      <i
        className={this.formatLike(this.props.likeState)}
        onClick={() => this.handleLike(this.props.id)}
        style={{ cursor: "pointer" }}
        aria-hidden="true"
      ></i>
    );
  }

  formatLike = (likeState) => {
    if (likeState) {
      return "fa fa-heart";
    } else {
      return "fa fa-heart-o";
    }
  };

  handleLike = (movieID) => {
    this.props.onLiked(movieID);
  };
}

export default Likes;
