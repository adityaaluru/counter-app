import React, { Component } from "react";

import Likes from "./likes";
import Pagination from "./pagination";
import { getMovies } from "../services/fakeMovieService";
import { getItemsInPage } from "../utils/pagination";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 3,
    selectedPage: 1,
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movieID) => {
    const movies = this.state.movies.map((m) => {
      if (m._id === movieID) {
        if (m.handleLike) m.handleLike = false;
        else m.handleLike = true;
      }
      return m;
    });
    this.setState({ movies });
  };

  handlePageChange = (pageId) => {
    this.setState({ selectedPage: pageId });
  };

  render() {
    const count = this.state.movies.length;
    const moviesToShow = getItemsInPage(
      this.state.movies,
      this.state.pageSize,
      this.state.selectedPage
    );

    if (count === 0) {
      return <p>There are no movies at this time!</p>;
    }
    return (
      <React.Fragment>
        <p>Currently showing {count} movies from the database</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {moviesToShow.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.genre.name}</td>
                <td>{item.numberInStock}</td>
                <td>{item.dailyRentalRate}</td>
                <td>
                  <Likes
                    id={item._id}
                    likeState={item.handleLike}
                    onLiked={this.handleLike}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(item)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalCount={count}
          pageSize={this.state.pageSize}
          onSelect={this.handlePageChange}
          selectedPage={this.state.selectedPage}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
