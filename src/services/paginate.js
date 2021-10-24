import _ from "lodash";

//lodash: _(items) converts the array to lodash wrapper
//slice - takes items starting with the index
//take - takes the given amount of items
//value - convert to ordinary array
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
