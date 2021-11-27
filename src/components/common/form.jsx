import React from "react";
import Input from "./input";
import Select from "./select";
import Joi from "joi";

class Form extends React.Component {
  state = {
    data: {},
    errors: {},
  };

  validateInputProperty = (propertyName, value) => {
    const obj = { [propertyName]: value };
    const propertySchema = Joi.object({
      [propertyName]: this.schema[propertyName],
    });
    const result = propertySchema.validate(obj);
    return result.error ? result.error.details[0].message : null;
  };

  handleChange = (e) => {
    //console.log("change handled");
    const errors = { ...this.state.errors }; //no reference
    const { id, value } = e.currentTarget;

    const propertyError = this.validateInputProperty(id, value);
    propertyError ? (errors[id] = propertyError) : delete errors[id]; //add the error or delete

    const data = { ...this.state.data }; //no reference
    data[id] = value; //this works only because the id is the name of the attribute

    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validateInput();
    this.setState({ errors: errors || {} }); //if null set it to {} to avoid exception
    if (errors) return;

    this.onSubmit();
  };

  //abortEarly: false ... we want to see all the errors, not just the first one.
  validateInput() {
    const joiOptions = { abortEarly: false };
    const result = Joi.object(this.schema).validate(
      this.state.data,
      joiOptions
    );
    //console.log(this.state.data);
    //console.log(this.schema);
    if (!result.error) return null;

    const errors = {};
    result.error.details.map((d) => (errors[d.path[0]] = d.message)); //path[0] contains the property name
    return Object.keys(errors).length === 0 ? null : errors;
  }

  renderSubmitButton = (label) => {
    return (
      <button
        disabled={this.validateInput()}
        className="btn btn-primary"
        type="submit"
      >
        {label}
      </button>
    );
  };

  renderInput = (name, label, type) => {
    const { data, errors } = this.state;
    return (
      <Input
        onChange={this.handleChange}
        id={name}
        value={data[name]}
        error={errors[name]}
        type={type}
        label={label}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;

    return (
      <Select
        onChange={this.handleChange}
        label={label}
        id={name}
        value={data[name]}
        options={options}
        error={errors[name]}
      />
    );
  };
}

export default Form;
