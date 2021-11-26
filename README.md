# Vidly client - React.js

## Branches sequence
- Hello world
- Movies list component
- Delete-button
- like-component
- pagination
- filtering
- sorting-1
- sorting-2
- sorting-3
- routing
- forms-1
- forms-2
- forms-3
- forms-4
- forms-5
- backend-comm-1
- backend-comm-2

## backend communication - Part 2

Extract configuration:

config.json:
```javascript
{
  "apiUrl": "http://localhost:3900/api/"
}
```

genreService:
```javascript
import httpService from "./httpService";
import { apiUrl } from "../config.json";

export function getGenres() {
  return httpService.get(apiUrl + "genres");
}
```

```javascript

```

```javascript

```

```javascript

```