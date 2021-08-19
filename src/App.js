import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Movies from "./components/movies";
import VidlyNavBar from "./components/vidlyNavBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
//import MovieDetails from "./components/movieDetails";
import LoginForm from "./components/loginForm";
import RegisterUserForm from "./components/registerUserForm";
import MovieForm from "./components/movieForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import http from "./services/httpService";

class App extends Component {
  async componentDidMount() {
    let response = await http.get("http://localhost:3000/api/movies/");
    console.log(response);
  }
  render() {
    return (
      <React.Fragment>
        <VidlyNavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/registerUser" component={RegisterUserForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
          <ToastContainer position="bottom-right" />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
