"use client";

import "./index.scss";

import { useState, useEffect } from "react";
import Link from "next/link";

import { db } from "@/lib/firebase";
import { query, collection, onSnapshot } from "firebase/firestore";
import { UserAuth } from "@/context/AuthContext";

const ProductsTable = () => {
  const { user } = UserAuth();
  const [modalActive, setModalActive] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const pattern = /(\d{2})\.(\d{2})\.(\d{4})/; // для парсинга даты из "ru-RU" в IST
      let productsArr = [];

      querySnapshot.forEach((doc) => {
        productsArr.push({ ...doc.data(), id: doc.id });
      });

      productsArr.sort((a, b) => {
        return (
          new Date(a.date_2.replace(pattern, "$3-$2-$1")) -
          new Date(b.date_2.replace(pattern, "$3-$2-$1"))
        );
      });
      setProducts(productsArr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <table className="relative Products_Table w-full">
      <thead>
        <tr className="hidden py-2 xl:flex xl:justify-between rounded-t-xl">
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
        {products.map((product, index) => (
          <ProductRow
            key={index}
            number={index + 1}
            name={<Link href={`/products/${product.id}`}>{product.name}</Link>}
            code={product.code}
            quantity={product.quantity}
            date_1={product.date_1}
            date_2={product.date_2}
          />
        ))}
      </tbody>
    </table>
  );
};

const ProductRow = ({ number, code, quantity, name, date_1, date_2 }) => {
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

export { ProductsTable };
