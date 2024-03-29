import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="navbar-brand" to="/">
            Vidly
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-item nav-link" to="/movies">
                Movies
              </NavLink>
              {/* <NavLink className="nav-item nav-link" to="/moviesgraphic">
                MoviesGraphic
              </NavLink> */}
              <NavLink className="nav-item nav-link" to="/genres">
                Genres
              </NavLink>
              <NavLink className="nav-item nav-link" to="/rentals">
                Rentals
              </NavLink>
              <NavLink className="nav-item nav-link" to="/customers">
                Customers
              </NavLink>
              {!this.props.user && this.navBarLoggedOut()}
              {this.props.user && this.navBarLoggedIn()}
            </div>
          </div>
        </nav>
      </div>
    );
  }

  navBarLoggedIn() {
    return (
      <React.Fragment>
        <NavLink className="nav-item nav-link" to="/profile">
          {this.props.user.name}
        </NavLink>
        <NavLink className="nav-item nav-link" to="/logout">
          Logout
        </NavLink>
      </React.Fragment>
    );
  }

  navBarLoggedOut() {
    return (
      <React.Fragment>
        <NavLink className="nav-item nav-link" to="/login">
          Login
        </NavLink>
        <NavLink className="nav-item nav-link" to="/register">
          Register
        </NavLink>
      </React.Fragment>
    );
  }
}

export default NavBar;
