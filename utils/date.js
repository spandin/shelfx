export const formatDate = (date_1, date_2) => {
  const date = new Date(date_1);

  date.setMonth(date.getMonth() + parseInt(date_2));
  return date.toLocaleDateString("ru-Ru");
};
