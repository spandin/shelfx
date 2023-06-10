'use client';

import { useState } from 'react';

export const metadata = {
  title: 'Лист продуктов - ShelfX',
  description: ''
};

export default function Products() {
  const [products, setProducts] = useState([]);

  return (
    <div className="Products w-full lg:px-4">
      <table className="Products_Table w-full">
        <thead>
          <tr className="hidden py-2 xl:flex xl:justify-between">
            <td className="grid grid-cols-table_g1 gap-4">
              <td className="">#</td>
              <td className="">Штрих код</td>
              <td className="">Кол.</td>
              <td className="">Наименование</td>
            </td>
            <td className="grid grid-cols-table_g2 gap-4">
              <td className="">Изготовлен</td>
              <td className="">Годен до</td>
            </td>
          </tr>
        </thead>

        <tbody>
          <tr
            className="flex flex-col  
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
                12
              </td>
              <td
                className="before:content-[attr(aria-label)] xl:before:hidden"
                aria-label="Штрих код: "
              >
                1234567890123456
              </td>
              <td
                className="before:content-[attr(aria-label)] xl:before:hidden"
                aria-label="Количество: "
              >
                10
              </td>
              <td
                className="before:content-[attr(aria-label)] xl:before:hidden"
                aria-label="Наименование: "
              >
                Наименование
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
                22/02/2222
              </td>
              <td
                className="before:content-[attr(aria-label)] xl:before:hidden"
                aria-label="Дата просрочки: "
              >
                22/02/2222
              </td>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
