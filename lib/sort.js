export const isNotExported = (array) =>
  array?.filter((product) => product.isExported !== true);

export const findInArrayBy = (array, by) =>
  array.filter((product) =>
    Object.values(product).some((value) => ("" + value).indexOf(by) !== -1),
  );

export const realLenghtArr = (a) =>
  a.filter(function () {
    return true;
  }).length;
