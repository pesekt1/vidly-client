# Vidly client - React.js

## Branches sequence
- Hello world
- Movies list component
- Delete-button
- like-component
- pagination

## Pagination

- Create pagination component based on bootstrap:
https://getbootstrap.com/docs/4.0/components/pagination/


- useful libraries: 
  - lodash:(optimized version of js underscore library)
    ```
    yarn add lodash
    ```
  - prop-types: (props type checking)
    ```
    yarn add prop-types
    ```

- Pagination component: 

  - Uses props: 
    - itemsCount, 
    - pageSize, 
    - currentPage, 
    - onPageChange
  - Uses propTypes - to set up a type rules


```javascript
import React from "react";
import _ from "lodash";
import propTypes from "prop-types";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a onClick={() => onPageChange(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
};

export default Pagination;
```

- Add it to movies component:
```javascript
class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4,
  };

...

handlePageChange = (page) => {
  this.setState({ currentPage: page });
};

...

<Pagination
  itemsCount={count}
  pageSize={pageSize}
  currentPage={currentPage}
  onPageChange={this.handlePageChange}
/>
```

- paginate service:
```javascript
import _ from "lodash";

//lodash: _(items) converts the array to lodash wrapper
//slice - takes items starting with the index
//take - takes the given amount of items
//value - convert to ordinary array
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
```

In movies component, we can now show paginated movies:

```javascript
<tbody>
  {paginate(movies, currentPage, pageSize).map((movie) => (
```

```javascript

```