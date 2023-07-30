export const isExported = (array) =>
  array.filter((product) => product.isExported !== true);

export const findInArrayBy = (array, by) =>
  array.filter((product) =>
    Object.values(product).some((value) => ("" + value).indexOf(by) !== -1)
  );

export const sortArrayByDate = (array) => {
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/; // для парсинга даты из "ru-RU" в IST

  array.sort((a, b) => {
    return (
      new Date(a?.date_2.replace(pattern, "$3-$2-$1")) -
      new Date(b?.date_2.replace(pattern, "$3-$2-$1"))
    );
  });
};
