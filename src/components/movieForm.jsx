import React from "react";
import Joi from "joi-browser";

import FormInput from "./form/input";
import BaseForm from "./form/baseForm";
import FormInputDropdown from "./form/inputDropdown";

import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

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
    this.state.genres = [];
    this.state.data = {
      id: "",
      title: "",
      genre: "",
      qtyInStock: "",
      rate: "",
      likedState: false,
    };
  }

  async componentDidMount() {
    //Set the list of available genres

    let remoteGenres = await getGenres();
    let genres = [{ _id: "00000", name: "" }, ...remoteGenres];

    // Pre-fill the form if the movieId is sent

    let data = {};
    const movieId = this.props.match.params.id;
    if (movieId !== "new" && movieId) {
      const movieData = await getMovie(movieId);
      if(movieData){
        data = {
          id: movieData._id,
          title: movieData.title,
          genre: movieData.genre.name,
          qtyInStock: movieData.numberInStock,
          rate: movieData.dailyRentalRate,
          likedState: movieData.likedState,
        };
        this.setState({ genres, data });
      }
      else {
        this.props.history.replace("/not-found");
      }
    }
    else {
      this.setState({genres});
    }
  }

  // doSubmit to be called by handleSubmit() method in the base form

  doSubmit = async () => {
    const { data } = this.state;
    let movie = {};
    movie.title = data.title;
    movie.genre = this.state.genres.find((item) => data.genre === item.name);
    movie.numberInStock = Number(data.qtyInStock);
    movie.dailyRentalRate = Number(data.rate);
    movie._id = data.id;
    movie.likedState = data.likedState;
    console.log("Movie: ",movie);
    await saveMovie(movie);
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
