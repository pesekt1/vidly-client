# Vidly client - React.js

## Routing

Install react-router-dom library
```
yarn add react-router-dom
```

Add simple components: just empty classes rendering text
- Customers
- Rentals
- NotFound

Wrap the App component in BrowserRouter from react-router-dom.

index.js:
```javascript
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

Create a NavBar component: use bootstrap: 

https://getbootstrap.com/docs/4.0/components/navbar/

Replace anchors with NavLinks - we want to avoid refreshing the whole page.

```javascript
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          Vidly
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/movies">
              Movies
            </NavLink>
            <NavLink className="nav-item nav-link" to="/rentals">
              Rentals
            </NavLink>
            <NavLink className="nav-item nav-link" to="/customers">
              Customers
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}
```


We need JavaScript files for some of the Bootstrap components: https://getbootstrap.com/docs/4.0/getting-started/introduction/

In index.html - before the end of the body:
```html
    <!-- jquerry and bootstrap bundle for the functionality of some of the bootstrap components -->
    <script
      src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
      integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
      crossorigin="anonymous"
    ></script>
</body>
```


Define the routes in App.js and use NavBar above the main container: use Switch, Route, and Redirect from react-router-dom:

```javascript
function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/customers/" component={Customers} />
          <Route path="/rentals/" component={Rentals} />
          <Route path="/movies/" component={Movies} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Movies} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
```

If the url does not match any route it will be redirected to NotFound component.

If we want some space after the Navbar we can edit the index.css:
```javascript
.navbar {
  margin-bottom: 30px;
}
```


Create links to movie form - In the Movies we were showing movie title. Now we want to have a link which will lead to the MovieForm component:

Edit the columns in MoviesTable - add a content attribute with an arrow function that takes a movie and returns a link to /movies/id and shows movie.title:
```javascript
class MoviesTable extends Component {
  columns = [
    {
      label: "Title",
      path: "title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
```
Now in the TableBody, it will render the Link instead of the title because of our renderCell method:

```javascript
class TableBody extends Component {
  renderCell(item, column) {
    return column.content ? column.content(item) : _.get(item, column.path);
  }
```

Now we need to add the route in App.js for this link:

```javascript
<Route path="/movies/:id" component={MovieForm} />
```

For now the MovieForm will just show the movie id and it will have a Save button which redirects us back to Movies component:

```javascript
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
```