import React, { Component } from "react";

class MovieDetails extends Component {
  handleSave = () => {
    // Navigate to /movies
    //this.props.history.push("/products");
    this.props.history.replace("/movies");
  };
  render() {
    return (
      <div>
        <h1>Movie id: {this.props.match.params.id}</h1>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleSave}
        >
          Save
        </button>
      </div>
    );
  }
}

export default MovieDetails;
