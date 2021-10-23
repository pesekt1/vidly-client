# Vidly client - React.js

## Like component

Create your own like component based on bootstrap like icon:

https://icons.getbootstrap.com/icons/heart/

https://icons.getbootstrap.com/icons/heart-fill/

When you click on it it should change between these 2 classes.

Install:
```
yarn add bootstrap-icons
```

- import in index.js:
```javascript
import "bootstrap-icons/font/bootstrap-icons.css";
```

- like component based on bootstrap-icons:
```javascript
import React, { Component } from "react";

class Like extends Component {
  render() {
    let dynamicClass = this.props.liked
      ? "bi bi-heart-fill m-2"
      : "bi bi-heart m-2";
    return (
      <i
        className={dynamicClass}
        onClick={this.props.onClick}
        style={{ cursor: "pointer" }}
        aria-hidden="true"
      ></i>
    );
  }
}

export default Like;
```
- handler function in movies component:
```javascript
  handleLike = (movie) => {
    const movies = [...this.state.movies]; // spread operator - no reference
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] }; //clone the object... no reference
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
```

- extra column in the movies table:
```javascript
<td>
  <Like
    liked={movie.liked}
    onClick={() => this.handleLike(movie)}
  />
</td>
```