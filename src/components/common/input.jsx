import React from "react";
class Input extends React.Component {
  render() {
    const { id, value, type } = this.props;

    return (
      <div className="form-group">
        <input
          className="form-control"
          onChange={this.props.onChange}
          value={value}
          type={type}
          id={id}
        />
      </div>
    );
  }
}

export default Input;
