"use client";

import "./ProductsTable.scss";

import { useState, useEffect } from "react";

import { db } from "@/lib/firebase";
import { query, collection, onSnapshot } from "firebase/firestore";
import { UserAuth } from "@/context/AuthContext";

import { ProductTable } from "./ProductTable";
import Link from "next/link";

export const ProductsTable = () => {
  const { user } = UserAuth();
  const [modalActive, setModalActive] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const pattern = /(\d{2})\.(\d{2})\.(\d{4})/; // для парсинга даты из "ru-RU" в IST
      let productsArr = [];

      // запись в массив обьектов из Firestore
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
          <ProductTable
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
