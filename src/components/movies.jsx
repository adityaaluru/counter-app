import React, { Component } from "react";

import MoviesTable from "./moviesTable";
import Pagination from "./pagination";
import ListGroup from "./listgroup";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { getItemsInPage } from "../utils/pagination";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    selectedPage: 1,
    selectedGenre: "all",
    genres: [],
  };

  // Lifecycle methods

  componentDidMount() {
    const genres = [{ _id: "all", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  // Event handlers

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

  handleSelectGenre = (genreId) => {
    this.setState({ selectedGenre: genreId, selectedPage: 1 });
  };

  filterMovies = (movies, genreId) => {
    if (genreId === "all") {
      return movies;
    } else {
      const filteredMovies = movies.filter(
        (movie) => movie.genre._id === genreId
      );
      return filteredMovies;
    }
  };

  render() {
    const filteredMovies = this.filterMovies(
      this.state.movies,
      this.state.selectedGenre
    );
    const count = filteredMovies.length;
    let selectedPage = this.state.selectedPage;
    const moviesToShow = getItemsInPage(
      filteredMovies,
      this.state.pageSize,
      selectedPage
    );

    if (count === 0) {
      return <p>There are no movies at this time!</p>;
    }
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <ListGroup
              allGenres={this.state.genres}
              onSelectGenre={this.handleSelectGenre}
              selectedGenre={this.state.selectedGenre}
            />
          </div>
          <div className="col">
            <p>Currently showing {count} movies from the database</p>
            <MoviesTable
              moviesToShow={moviesToShow}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
            />
            <Pagination
              totalCount={count}
              pageSize={this.state.pageSize}
              onSelect={this.handlePageChange}
              selectedPage={selectedPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
