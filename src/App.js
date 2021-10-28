import React from "react";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import { Route, Redirect, Switch } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notfound";
import MovieForm from "./components/movieform";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
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
