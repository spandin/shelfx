export const isNotExported = (array) =>
  array?.filter((product) => product.isExported !== true);

export const findInArrayBy = (array, by) =>
  array.filter((product) =>
    Object.values(product).some((value) => ("" + value).indexOf(by) !== -1),
  );
