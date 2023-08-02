"use client";

import "./_index.scss";

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
import { useAuth } from "@/hooks/use-auth";

import { findInArrayBy, sortArrayByDate, isExported } from "@/lib/sort";

import { BsSearch, BsDownload, BsJustifyLeft } from "react-icons/bs";
import { Modal } from "@/components/Modal/Modal";
import { IcButton } from "@/components/Button/IcButton/IcButton";
import { Search } from "@/components/Modal/Search/Search";
import { Filter } from "@/components/Modal/Filter/Filter";

const Table = () => {
  const tableRef = useRef(null);
  const { email } = useAuth();

  const [searchModalActive, setSearchModalActive] = useState(false);
  const [filterModalActive, setFilterModalActive] = useState(false);

  const [categoryValue, setCategoryValue] = useState("all");
  const [exportedValue, setExportedValue] = useState("exported");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let productsArr = [];

      querySnapshot.forEach((doc) => {
        productsArr.push({ ...doc.data(), id: doc.id });
      });

      sortArrayByDate(productsArr);

      if (exportedValue === "notExported") {
        return setProducts(isExported(productsArr));
      } else if (categoryValue === "cosmetic") {
        return setProducts(findInArrayBy(productsArr, "Косметика"));
      } else if (categoryValue === "products") {
        return setProducts(findInArrayBy(productsArr, "Продукты"));
      } else if (categoryValue === "alcohol") {
        return setProducts(findInArrayBy(productsArr, "Алкоголь"));
      } else if (categoryValue === "chemistry") {
        return setProducts(findInArrayBy(productsArr, "Химия"));
      } else if (categoryValue === "other") {
        return setProducts(findInArrayBy(productsArr, "Другое"));
      }

      setProducts(productsArr);
    });
    return () => unsubscribe();
  }, [exportedValue, categoryValue]);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `${categoryValue}(${exportedValue})`,
  });

  const setProductMark = async () => {
    const allId = products.map((product) => product?.id);

    try {
      onDownload();
      for (const id of allId) {
        await updateDoc(doc(db, "products", id), {
          isExported: true,
          exportedDate: new Date().toLocaleDateString("ru-Ru"),
          whoExported: email,
        });
      }
    } catch (e) {
      console.log(`setProductMark`, e.message);
    }
  };

  return (
    <div className="Products">
      <nav className="Products__nav flex justify-between py-4 lg:p-4 lg:rounded-t-xl ">
        <div className="flex gap-3 flex-row">
          <IcButton
            className="IcButtonA"
            onClick={
              email === "willstesi@gmail.com" && "veronika2023@gmail.com"
                ? () => setProductMark()
                : () => onDownload()
            }
            icon={<BsDownload />}
            text="Экспорт Excel"
          />
        </div>
        <div className="flex gap-3 flex-row">
          <IcButton
            className="IcButtonA"
            onClick={() => setFilterModalActive(true)}
            icon={<BsJustifyLeft />}
            text="Фильтр"
          />
          <IcButton
            className="IcButtonA"
            onClick={() => setSearchModalActive(true)}
            icon={<BsSearch />}
          />
        </div>
      </nav>

      <table className="w-full" ref={tableRef}>
        <tbody className="w-full flex flex-col gap-2">
          {products.map((product, index) => (
            <ProductCard
              key={product?.id}
              product={product}
              number={index + 1}
            />
          ))}
        </tbody>
      </table>

      <Modal active={filterModalActive} setActive={setFilterModalActive}>
        <Filter
          categoryValue={setCategoryValue}
          exportedValue={setExportedValue}
        />
      </Modal>

      <Modal active={searchModalActive} setActive={setSearchModalActive}>
        <Search />
      </Modal>
    </div>
  );
};

const ProductCard = ({ product, number }) => {
  return (
    <tr
      className="flex flex-col p-4
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

        <td className="flex text-xs">{product?.quantity} ШТ.</td>
      </td>

      <td
        className="flex flex-col-reverse
                        xl:grid xl:grid-cols-table_g1 xl:gap-4"
      >
        <td className="hidden xl:flex">{number}</td>

        <td className="text-base xl:text-lg text-darkG-100 xl:text-[#fff]">
          {product?.code}
        </td>

        <td className="hidden xl:flex">{product?.quantity}</td>

        <td className="mt-2 xl:mt-0 text-xl">
          {number}.{" "}
          <Link href={`/products/${product?.id}`}>{product?.name}</Link>
        </td>
      </td>

      <td
        className="hover:flex mt-2 text-sm xl:text-lg  xl:mt-0 
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

export { Table };
