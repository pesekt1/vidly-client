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
          if (!authService.getCurrentUser()) return <Redirect to="/login" />;
          return Component ? <Component {...props} /> : render(props); //React expects component to start with capital letter.
        }}
      />
    );
  }
}

export default ProtectedRoute;
