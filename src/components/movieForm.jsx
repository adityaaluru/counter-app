import React from "react";
import Joi from "joi-browser";

import FormInput from "./form/input";
import BaseForm from "./form/baseForm";
import FormInputDropdown from "./form/inputDropdown";

import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends BaseForm {
  schema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    qtyInStock: Joi.number().integer().required().label("Quantity in stock"),
    rate: Joi.number().required().min(0).max(10).label("Rate"),
  };

  constructor(props) {
    super(props);

    this.state = {};
    this.state.errors = {};
    this.state.genres = [{ _id: "00000", name: "" }, ...getGenres()];
    this.state.data = {
      id: "",
      title: "",
      genre: "",
      qtyInStock: "",
      rate: "",
      likedState: false,
    };
  }

  componentDidMount() {
    let data = {};
    const movieId = this.props.match.params.id;
    if (movieId !== "new" && movieId) {
      const movieData = getMovie(movieId);
      data = {
        id: movieData._id,
        title: movieData.title,
        genre: movieData.genre.name,
        qtyInStock: movieData.numberInStock,
        rate: movieData.dailyRentalRate,
        likedState: movieData.likedState,
      };
      this.setState({ data });
    }
  }

  // doSubmit to be called by handleSubmit() method in the base form

  doSubmit = () => {
    const { data } = { ...this.state };
    let movie = {};
    movie.title = data.title;
    movie.genre = this.state.genres.find((item) => data.genre === item.name);
    movie.numberInStock = Number(data.qtyInStock);
    movie.dailyRentalRate = Number(data.rate);
    movie._id = data.id;
    movie.likedState = data.likedState;

    saveMovie(movie);
    this.props.history.push("/movies");
  };

  render() {
    const { match } = this.props;
    return (
      <React.Fragment>
        <h1>
          {match.params.id === "new"
            ? "New Movie"
            : "Edit Movie -" + match.params.id}
        </h1>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            id="title"
            type="text"
            autoFocus
            onChange={this.handleChange}
            value={this.state.data.title}
            labelText="Title"
            error={this.state.errors}
          />
          <FormInputDropdown
            id="genre"
            labelText="Genre"
            onChange={this.handleChange}
            enums={this.state.genres}
            value={this.state.data.genre}
          ></FormInputDropdown>
          <FormInput
            id="qtyInStock"
            type="text"
            onChange={this.handleChange}
            value={this.state.data.qtyInStock}
            labelText="Quantity In Stock"
            error={this.state.errors}
          />
          <FormInput
            id="rate"
            type="text"
            onChange={this.handleChange}
            value={this.state.data.rate}
            labelText="Rate"
            error={this.state.errors}
          />
          <button
            disabled={this.isSubmitDisabled()}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
