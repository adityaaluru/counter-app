import _ from "lodash";

export function getItemsInPage(items, pageSize, selectedPage) {
  return _(items)
    .slice(pageSize * (selectedPage - 1))
    .take(pageSize)
    .value();
}
