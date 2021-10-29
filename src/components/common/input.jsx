import React from "react";
class Input extends React.Component {
  render() {
    const { id, value, type, error } = this.props;

    return (
      <div className="form-group">
        <input
          className="form-control"
          onChange={this.props.onChange}
          value={value}
          type={type}
          id={id}
        />
        {error && <div className="alert alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Input;
