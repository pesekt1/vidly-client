import React from "react";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import { Route, Redirect, Switch } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import "./App.css";
import LoginForm from "./components/loginForm";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/login/" component={LoginForm} />
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

export default App;
