"use client";

import "./index.scss";

import { useState, useEffect, useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import Link from "next/link";

import { db } from "@/lib/firebase";
import { query, collection, onSnapshot } from "firebase/firestore";
import { UserAuth } from "@/context/AuthContext";

import { toastAuthErr } from "@/lib/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdAdd, MdFilterList, MdSaveAlt, MdSearch } from "react-icons/md";
import { Modal } from "@/components/Modal/Modal";
import { IcButton } from "@/components/Button/IcButton/IcButton";
import { AddProduct } from "@/components/Modal/Products/AddProduct";
import { Search } from "@/components/Modal/Search/Search";
import { Filter } from "@/components/Modal/Filter/Filter";

const ProductsTable = () => {
  const tableRef = useRef(null);
  const { user } = UserAuth();

  const [addModalActive, setAddModalActive] = useState(false);
  const [searchModalActive, setSearchModalActive] = useState(false);
  const [filterModalActive, setFilterModalActive] = useState(false);

  const [filterValues, setFilterValues] = useState("all");
  const [products, setProducts] = useState([]);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `${filterValues}`,
  });

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let productsArr = [];

      querySnapshot.forEach((doc) => {
        productsArr.push({ ...doc.data(), id: doc.id });
      });

      const pattern = /(\d{2})\.(\d{2})\.(\d{4})/; // для парсинга даты из "ru-RU" в IST

      productsArr.sort((a, b) => {
        return (
          new Date(a.date_2.replace(pattern, "$3-$2-$1")) -
          new Date(b.date_2.replace(pattern, "$3-$2-$1"))
        );
      });

      const findProductsByCategory = (category) =>
        productsArr.filter((product) =>
          Object.values(product).some(
            (value) => ("" + value).indexOf(category) !== -1
          )
        );

      if (filterValues === "cosmetic") {
        return setProducts(findProductsByCategory("Косметика"));
      } else if (filterValues === "products") {
        return setProducts(findProductsByCategory("Продукты"));
      } else if (filterValues === "alcohol") {
        return setProducts(findProductsByCategory("Алкоголь"));
      } else if (filterValues === "chemistry") {
        return setProducts(findProductsByCategory("Химия"));
      } else if (filterValues === "other") {
        return setProducts(findProductsByCategory("Другое"));
      }

      setProducts(productsArr);
    });
    return () => unsubscribe();
  }, [filterValues]);

  return (
    <div className="Products">
      <nav className="Products__nav flex justify-between sticky top-0 bg-darkD-200 px-5 py-2 lg:p-4 lg:rounded-t-xl">
        <div className="flex gap-3 flex-row">
          <IcButton
            className="IcButtonA"
            onClick={user ? () => setAddModalActive(true) : toastAuthErr}
            icon={<MdAdd />}
            text="Добавить"
          />
          <IcButton
            className="IcButtonA"
            onClick={onDownload}
            icon={<MdSaveAlt />}
            text="Экспорт Excel"
          />
        </div>
        <div className="flex gap-3 flex-row">
          <IcButton
            className="IcButtonA"
            onClick={() => setFilterModalActive(true)}
            icon={<MdFilterList />}
            text="Фильтр"
          />
          <IcButton
            className="IcButtonA"
            onClick={() => setSearchModalActive(true)}
            icon={<MdSearch />}
          />
        </div>
      </nav>

      <table className="w-full" ref={tableRef}>
        <tbody>
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              number={index + 1}
            />
          ))}
        </tbody>
      </table>

      <Modal active={addModalActive} setActive={setAddModalActive}>
        <AddProduct />
      </Modal>

      <Modal active={filterModalActive} setActive={setFilterModalActive}>
        <Filter filterValue={setFilterValues} />
      </Modal>

      <Modal active={searchModalActive} setActive={setSearchModalActive}>
        <Search />
      </Modal>

      <ToastContainer limit={1} theme="dark" position="bottom-center" />
    </div>
  );
};

const ProductCard = ({ product, number }) => {
  return (
    <tr
      className="flex flex-col p-5
                    xl:flex-row xl:justify-between xl:py-2"
    >
      <td className="flex flex-row justify-between content-center xl:hidden">
        <td className="td__category flex text-xs rounded-sm px-2 py-1">
          {product.category}
        </td>

        <td className="flex text-xs">{product.dateAdded}</td>
      </td>

      <td
        className="flex flex-col-reverse
                        xl:grid xl:grid-cols-table_g1 xl:gap-4"
      >
        <td
          className="hidden before:content-[attr(aria-label)] xl:before:hidden xl:flex"
          aria-label="№: "
        >
          {number}
        </td>

        <td
          className="text-sm xl:text-lg text-darkG-200 xl:text-[#fff]"
          aria-label="Штрих код: "
        >
          {product.code}
        </td>

        <td
          className="hidden before:content-[attr(aria-label)] xl:before:hidden xl:flex"
          aria-label="Количество: "
        >
          {product.quantity}
        </td>

        <td className="mt-4 xl:mt-0 " aria-label="Наименование: ">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
          <span className="xl:hidden"> - {product.quantity} шт.</span>
        </td>
      </td>

      <td
        className="flex flex-col mt-2 text-sm xl:text-lg  xl:mt-0 
          xl:grid xl:grid-cols-table_g2 xl:gap-4"
      >
        <td
          className="before:content-[attr(aria-label)] xl:before:hidden"
          aria-label="Дата изготовления: "
        >
          {product.date_1}
        </td>
        <td
          className="before:content-[attr(aria-label)] xl:before:hidden"
          aria-label="Дата просрочки: "
        >
          {product.date_2}
        </td>
      </td>
    </tr>
  );
};

export { ProductsTable };
