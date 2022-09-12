# Vidly client - React.js

## Create genres page
Update genreService
Create components:
- Genres page
- GenresForm
- GenresTable

## Genres service:
We need 2 methods:
```javascript
import httpService from "./httpService";

const apiGenres = "/genres/";

export function getGenres() {
  return httpService.get(apiGenres);
}

export function saveGenre(genre) {
  return httpService.post(apiGenres, genre);
}
```

Now we build the components in a similar way like we did for movies:

Genres component will render:
- Searchbox
- GenresTable
- Pagination

## GenresTable
GenresTable will use the reusable Table component:
```javascript
import Table from "./common/table";

class GenresTable extends Component {
  columns = [
    {
      label: "Genre",
      path: "name",
    },
  ];

  render() {
    const { genres, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={genres}
      />
    );
  }
}
```

## Creating new genre:
We need a GenreForm component:
```javascript
import Form from "./common/form";
import Joi from "joi";
import { saveGenre } from "../services/genreService";

class GenreForm extends Form {
  //attributes cannot be null or undefined because they are used as an input value in the form.
  state = {
    data: {
      name: "",
    },
    errors: {},
  };

  //label is just for rendering the error messages
  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Title"),
  };

  onSubmit = async () => {
    await saveGenre(this.state.data);
    console.log("Genre form submitted to the server.");
    this.props.history.push("/genres");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Genre</h1>
          {this.renderInput("name", "Genre", "text")}
          {this.renderSubmitButton("Save")}
        </form>
      </div>
    );
  }
}
```