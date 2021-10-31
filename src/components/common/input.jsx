import React from "react";
class Input extends React.Component {
  render() {
    const { id, error, label, ...rest } = this.props;

    // setting the rest of the parameters dynamically:
    // {...rest} are all the props that have the same name as the property:
    // example: onChange={onChange} type={type} value={value}
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input className="form-control" id={id} {...rest} />
        {error && <div className="alert alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Input;
