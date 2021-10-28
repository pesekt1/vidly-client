import React from "react";
class MovieForm extends React.Component {
  render() {
    return (
      <div>
        <h1>Movie {this.props.match.params.id}</h1>
        <button
          className="btn btn-primary"
          onClick={() => this.props.history.push("/movies")}
        >
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
