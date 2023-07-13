export function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

export const convertRuToUTC = (date) => {
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  return new Date(date?.replace(pattern, "$3-$2-$1"));
};

export const calcEndOfTerm = (date_1, date_2) => {
  const date = convertRuToUTC(date_1);

  date.setMonth(date.getMonth() + parseInt(date_2));
  return date.toLocaleDateString("ru-Ru");
};

export const calcEndOfTermInfo = (date_1, date_2) => {
  const date = convertRuToUTC(date_1);

  date.setMonth(date.getMonth() + parseInt(date_2));
  return date;
};
