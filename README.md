# Vidly client - React.js

## Customers page
Create a customers page for the admin to manage customers.
Create or update all the necessary components:
- customerService
- customers page
- customersTable
- customerForm
- update vidly server app - customer model needs to be updated otherwise we cannot save or update a customer
- Create customers collection in the database and seed it with some data

## CustomerService
We need HTTP service to communicate with the server:
```javascript
import httpService from "./httpService";

const apiCustomers = "/customers/";

export function getCustomers() {
  return httpService.get(apiCustomers);
}

export function deleteCustomer(customerId) {
  return httpService.delete(apiCustomers + customerId);
}

export function getCustomer(customerId) {
  return httpService.get(apiCustomers + customerId);
}

export function saveCustomer(customer) {
  if (!customer._id) return httpService.post(apiCustomers, customer);

  //if exist, use put method but remove the _id attribute from the object.
  const data = { ...customer };
  delete data._id;

  return httpService.put(apiCustomers + customer._id, data);
}
```

## Customers page:

Customers component renders:
- Searchbox
- CustomersTable
- Pagination

## CustomersTable component:
Using the reusable Table component:

```javascript
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class CustomersTable extends Component {
  columns = [
    {
      label: "First Name",
      path: "first_name",
      content: (customer) => (
        <Link to={`/customers/${customer._id}`}>{customer.first_name}</Link>
      ),
    },
    { label: "Last Name", path: "last_name" },
    { label: "Address", path: "address" },
    { label: "City", path: "city" },
    { label: "State", path: "state" },
    { label: "Points", path: "points" },
    { label: "Phone", path: "phone" },
    { label: "Birth date", path: "birth_date" },
  ];

  //separate object because we want to append it dynamically - only if user is logged in and admin.
  deleteColumn = {
    key: "delete",
    content: (customer) => (
      <button
        onClick={() => this.props.onDelete(customer)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { customers, onDelete, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={customers}
        onDelete={onDelete}
      />
    );
  }
}
```

## CustomersForm component:
For editing or creating a new customer we need a CustomerForm component. We extend our reusable Form component.

```javascript
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
```

## Update vidly server app
We need to update the customer model in the vidly server app. We need to add the following code to the customer model:

```javascript
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const customerSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  points: { type: Number, required: true },
  phone: { type: String, required: false },
  birth_date: { type: String, required: true },
});

//class based on our schema compiled into a model
const Customer = mongoose.model("Customer", customerSchema);

function validate(customer) {
  const schema = Joi.object({
    customer_id: Joi.number().optional(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    points: Joi.number().required(),
    phone: Joi.string().optional(),
    birth_date: Joi.string().required(),
  });

  return schema.validate(customer);
}
```

We need to update the customer routes in the vidly server app. We need to add the following code to the customer routes:

POST request:
```javascript
router.post("/", async (req, res) => {
  // #swagger.tags = ['Customers']

  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const customer = new Customer({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    points: req.body.points,
    phone: req.body.phone,
    birth_date: req.body.birth_date,
  });

  try {
    await customer.save();
    res.send(customer);
  } catch (error) {
    console.log("error: " + error.message);
  }
});
```

PUT request:
```javascript
router.put("/:id", async (req, res) => {
  // #swagger.tags = ['Customers']

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      points: req.body.points,
      phone: req.body.phone,
      birth_date: req.body.birth_date,
    },
    { new: true }
  );
  if (!customer)
    return res.status(404).send("customer with given id was not found");

  res.send(customer);
});
```

## Create Customers collection in the database:
We need to create a collection in the database called customers. We can take some sample data set. The one that was used here has following structure:

```json
[
	{
		"customer_id" : 1,
		"first_name" : "Babara",
		"last_name" : "MacCaffrey",
		"birth_date" : "1986-03-28",
		"phone" : "781-932-9754",
		"address" : "0 Sage Terrace",
		"city" : "Waltham",
		"state" : "WV",
		"points" : 3
	},
	{
		"customer_id" : 2,
		"first_name" : "Ines",
		"last_name" : "Brushfield",
		"birth_date" : "1986-04-13",
		"phone" : "804-427-9456",
		"address" : "14187 Commercial Trail",
		"city" : "Hampton",
		"state" : "VA",
		"points" : 5
	},
```

TODO: 
Pagination component needs improvment - if there are many pages we need Previous and Next buttons and then show only few page numbers.

Customers page - make a selector for the search input. Now it searches the last_name by default.
