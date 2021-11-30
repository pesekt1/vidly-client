import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

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
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends React.Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user: user }); //this will cause re-rendering
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/logout" component={LogoutForm} />
            <Route path="/profile" component={Profile} />
            <Route path="/login/" component={LoginForm} />
            <Route path="/register/" component={RegisterForm} />
            <Route path="/customers/" component={Customers} />
            <Route path="/rentals/" component={Rentals} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies/"
              render={(props) => <Movies {...props} user={user} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Route
              path="/"
              exact
              render={(props) => <Movies {...props} user={user} />}
            />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
