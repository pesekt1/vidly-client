import React from "react";
import Form from "./common/form";
import Joi from "joi";
import { getCustomer, saveCustomer } from "../services/customerService";

class CustomerForm extends Form {
  //attributes cannot be null or undefined because they are used as an input value in the form.
  state = {
    data: {
      first_name: "",
      last_name: "",
      address: "",
      city: "",
      state: "",
      points: "",
      phone: "",
      birth_date: "",
    },
    errors: {},
  };

  //label is just for rendering the error messages
  schema = {
    _id: Joi.string(),
    customer_id: Joi.number(),
    first_name: Joi.string().required().label("First Name"),
    last_name: Joi.string().required().label("Last Name"),
    address: Joi.string().required().label("Address"),
    city: Joi.string().required().label("City"),
    state: Joi.string().required().label("State"),
    points: Joi.number().required().label("Points"),
    phone: Joi.string().optional().label("Phone"),
    birth_date: Joi.string().required().label("Birth Date"),
  };

  async populateCustomer() {
    const customerId = this.props.match.params.id;
    if (customerId === "new") return;

    try {
      const { data: customer } = await getCustomer(this.props.match.params.id);
      if (!customer.phone) customer.phone = ""; //avoiding null value in the input field

      this.setState({ data: customer });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateCustomer();
  }

  onSubmit = async () => {
    await saveCustomer(this.state.data);
    console.log("Customer form submitted to the server.");
    this.props.history.push("/customers");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Customer</h1>
          {this.renderInput("first_name", "First Name", "text")}
          {this.renderInput("last_name", "Last Name", "text")}
          {this.renderInput("address", "Address", "text")}
          {this.renderInput("city", "City", "text")}
          {this.renderInput("state", "State", "text")}
          {this.renderInput("points", "Points", "text")}
          {this.renderInput("phone", "Phone", "text")}
          {this.renderInput("birth_date", "Birth date", "text")}

          {this.renderSubmitButton("Save")}
        </form>
      </div>
    );
  }
}

export default CustomerForm;
