import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";

import Movies from "./components/movies";
import NavBar from "./components/navBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import LogoutForm from "./components/logout";
import Profile from "./components/profile";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends React.Component {
  state = {};

  componentDidMount() {
    const jwt = localStorage.getItem("token");
    const user = jwt ? jwtDecode(jwt) : null; //decodes the jwt payload
    console.log(user);
    this.setState({ user: user }); //this will cause re-rendering
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/logout" component={LogoutForm} />
            <Route path="/profile" component={Profile} />
            <Route path="/login/" component={LoginForm} />
            <Route path="/register/" component={RegisterForm} />
            <Route path="/customers/" component={Customers} />
            <Route path="/rentals/" component={Rentals} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies/" component={Movies} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Movies} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
