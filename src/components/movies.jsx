import React, { Component } from "react";

import MoviesTable from "./moviesTable";
import Pagination from "./pagination";
import ListGroup from "./listgroup";
import {
  deleteMovie,
  getMovies,
  saveMovie,
} from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { getItemsInPage } from "../utils/pagination";
import SearchBox from "./form/searchbox";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    selectedPage: 1,
    selectedGenre: "all",
    searchString: "",
    genres: [],
  };

  // Lifecycle methods

  componentDidMount() {
    const genres = [{ _id: "all", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  // Event handlers

  handleDelete = (movie) => {
    deleteMovie(movie._id);
    this.setState({ movies: getMovies() });
  };

  handleLike = (movieID) => {
    const movie = this.state.movies.find((m) => m._id === movieID);

    if (movie.likedState) movie.likedState = false;
    else movie.likedState = true;
    saveMovie(movie);

    this.setState({ movies: getMovies() });
  };

  handlePageChange = (pageId) => {
    this.setState({ selectedPage: pageId });
  };

  handleSelectGenre = (genreId) => {
    this.setState({
      selectedGenre: genreId,
      searchString: "",
      selectedPage: 1,
    });
  };

  handleNewMovie = () => {
    this.props.history.push("/movies/new");
  };
  handleSearch = (searchString) => {
    this.setState({ searchString, selectedGenre: "all", selectedPage: 1 });
  };

  filterMovies = (movies, genreId, searchString) => {
    let result = {};
    if (genreId === "all") {
      result = movies;
    } else {
      result = movies.filter((movie) => movie.genre._id === genreId);
    }
    if (searchString !== "") {
      result = result.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchString.toLowerCase())
      );
    }
    return result;
  };

  render() {
    const filteredMovies = this.filterMovies(
      this.state.movies,
      this.state.selectedGenre,
      this.state.searchString
    );
    const count = filteredMovies.length;
    let selectedPage = this.state.selectedPage;
    const moviesToShow = getItemsInPage(
      filteredMovies,
      this.state.pageSize,
      selectedPage
    );

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
            <button className="btn btn-primary" onClick={this.handleNewMovie}>
              New Movie
            </button>
            {count === 0 ? (
              <p>There are no movies for the selected criteria!</p>
            ) : (
              <p>Currently showing {count} movies from the database</p>
            )}
            <SearchBox
              value={this.state.searchString}
              onChange={this.handleSearch}
            />
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
