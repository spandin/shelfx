"use client";

import "./index.scss";

import { useState, useEffect, useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import Link from "next/link";

import { db } from "@/lib/firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { UserAuth } from "@/context/AuthContext";

import { toastAuthErr } from "@/lib/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { findInArrayBy, sortArrayByDate, isActive } from "@/utils/sort";

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

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let productsArr = [];

      querySnapshot.forEach((doc) => {
        productsArr.push({ ...doc.data(), id: doc.id });
      });

      sortArrayByDate(productsArr);

      if (filterValues === "cosmetic") {
        return setProducts(findInArrayBy(productsArr, "Косметика"));
      } else if (filterValues === "products") {
        return setProducts(findInArrayBy(productsArr, "Продукты"));
      } else if (filterValues === "alcohol") {
        return setProducts(findInArrayBy(productsArr, "Алкоголь"));
      } else if (filterValues === "chemistry") {
        return setProducts(findInArrayBy(productsArr, "Химия"));
      } else if (filterValues === "other") {
        return setProducts(findInArrayBy(productsArr, "Другое"));
      }

      setProducts(isActive(productsArr));
    });
    return () => unsubscribe();
  }, [filterValues]);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `${filterValues}`,
  });

  const setProductMark = async () => {
    const allId = products.map((product) => product?.id);

    try {
      onDownload();
      for (const id of allId) {
        await updateDoc(doc(db, "products", id), {
          isExported: true,
          exportedDate: new Date().toLocaleDateString("ru-Ru"),
          whoExported: user.email,
        });
      }
    } catch (e) {
      console.log(`setProductMark`, e.message);
    }
  };

  return (
    <div className="Products">
      <nav className="Products__nav flex justify-between sticky top-0 z-99 bg-darkD-200 px-5 py-2 lg:p-4 lg:rounded-t-xl ">
        <div className="flex gap-3 flex-row">
          <IcButton
            className="IcButtonA"
            onClick={user ? () => setAddModalActive(true) : toastAuthErr}
            icon={<MdAdd />}
            text="Добавить"
          />
          <IcButton
            className="IcButtonA"
            onClick={() => setProductMark()}
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
              key={product?.id}
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
      <td className="flex flex-row justify-between items-center xl:hidden">
        <td className="flex flex-row gap-3">
          <td className="td__category text-xs rounded-sm px-2 py-1">
            {product?.category}
          </td>
          <td
            className={`${
              product?.isExported ? "td__exported" : "td__noexported"
            } text-xs rounded-sm px-2 py-1 xl:hidden`}
          >
            {product?.isExported ? "Внесен" : "Не внесен"}
          </td>
        </td>

        <td className="flex text-xs">{product?.dateAdded}</td>
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
          {product?.code}
        </td>

        <td
          className="hidden before:content-[attr(aria-label)] xl:before:hidden xl:flex"
          aria-label="Количество: "
        >
          {product?.quantity}
        </td>

        <td className="mt-4 xl:mt-0 " aria-label="Наименование: ">
          <Link href={`/products/${product?.id}`}>{product?.name}</Link>
          <span className="xl:hidden"> - {product?.quantity} шт.</span>
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
          {product?.date_1}
        </td>
        <td
          className="before:content-[attr(aria-label)] xl:before:hidden"
          aria-label="Дата просрочки: "
        >
          {product?.date_2}
        </td>
      </td>
    </tr>
  );
};

export { ProductsTable };
