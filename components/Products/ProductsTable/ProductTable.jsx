export const ProductTable = ({
  number,
  code,
  quantity,
  name,
  date_1,
  date_2,
}) => {
  return (
    <tr
      className="flex flex-col py-5
                    xl:flex-row xl:justify-between xl:py-2"
    >
      <td
        className="flex flex-col
                        xl:grid xl:grid-cols-table_g1 xl:gap-4"
      >
        <td
          className="before:content-[attr(aria-label)] xl:before:hidden"
          aria-label="№: "
        >
          {number}
        </td>
        <td
          className="before:content-[attr(aria-label)] xl:before:hidden"
          aria-label="Штрих код: "
        >
          {code}
        </td>
        <td
          className="before:content-[attr(aria-label)] xl:before:hidden"
          aria-label="Количество: "
        >
          {quantity}
        </td>
        <td
          className="before:content-[attr(aria-label)] xl:before:hidden"
          aria-label="Наименование: "
        >
          {name}
        </td>
      </td>
      <td
        className="flex flex-col
          xl:grid xl:grid-cols-table_g2 xl:gap-4"
      >
        <td
          className="before:content-[attr(aria-label)] xl:before:hidden"
          aria-label="Дата изготовления: "
        >
          {date_1}
        </td>
        <td
          className="before:content-[attr(aria-label)] xl:before:hidden"
          aria-label="Дата просрочки: "
        >
          {date_2}
        </td>
      </td>
    </tr>
  );
};
