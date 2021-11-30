import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "../../services/authService";

class ProtectedRoute extends React.Component {
  render() {
    const { path, component: Component, render } = this.props; //we need to rename component to Component
    return (
      <Route
        path={path}
        {...this.props.rest}
        render={(props) => {
          if (!authService.getCurrentUser())
            return (
              //The state object can be accessed via this.props.location.state in the redirected-to component.
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location },
                }}
              />
            );
          return Component ? <Component {...props} /> : render(props); //React expects component to start with capital letter.
        }}
      />
    );
  }
}

export default ProtectedRoute;
