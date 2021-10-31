import React from "react";
import Joi from "joi-browser";

class Form extends React.Component {
  state = {
    data: {},
    errors: {},
  };

  validateInputProperty = (propertyName, value) => {
    const obj = { [propertyName]: value };
    const schema = { [propertyName]: this.schema[propertyName] };
    console.log(obj);
    console.log(schema);
    const result = Joi.validate(obj, schema);
    return result.error ? result.error.details[0].message : null;
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors }; //no reference
    const { id, value } = e.currentTarget;

    const propertyError = this.validateInputProperty(id, value);
    propertyError ? (errors[id] = propertyError) : delete errors[id]; //add the error or delete

    const data = { ...this.state.data }; //no reference
    data[id] = value; //this works only because the id is the name of the attribute

    this.setState({ data, errors });
  };

  //abortEarly: false ... we want to see all the errors, not just the first one.
  validateInput() {
    const joiOptions = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, joiOptions);
    if (!result.error) return null;

    const errors = {};
    result.error.details.map((d) => (errors[d.path[0]] = d.message)); //path[0] contains the property name
    return Object.keys(errors).length === 0 ? null : errors;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validateInput();
    this.setState({ errors: errors || {} }); //if null set it to {} to avoid exception
    if (errors) return;

    this.onSubmit();
  };
}

export default Form;
