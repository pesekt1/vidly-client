import React from "react";
class Select extends React.Component {
  render() {
    const { id, error, label, options, ...rest } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <select className="form-control" id={id} {...rest}>
          <option value=""></option>
          {options.map((o) => (
            <option key={o._id} value={o._id}>
              {o.name}
            </option>
          ))}
        </select>
        {error && <div className="alert alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Select;
