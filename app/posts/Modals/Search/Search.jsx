import "./_index.scss";

import Link from "next/link";
import { useState, useEffect } from "react";

import { db } from "@/firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

export const Search = () => {
  const [searchVariant, setSearchVariant] = useState("bar-code");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "data"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data = [];

      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      const results = data.filter((product) => {
        if (searchVariant === "name") {
          return product.name.toLowerCase().includes(searchTerm);
        } else {
          return String(product.code)
            .split("")
            .reverse()
            .join("")
            .includes(searchTerm.split("").reverse().join(""));
        }
      });

      setSearchResults(results);
    });
    return () => unsubscribe();
  }, [searchTerm, searchVariant]);

  return (
    <div className="Search flex max-h-screen flex-col gap-5">
      <h3 className="Search px-[3px]">Поиск продукта</h3>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-3 px-1 text-sm">
          <span
            className={`${
              searchVariant === "name"
                ? " text-darkV-400 underline dark:text-lightW-200"
                : "text-darkG-100"
            }`}
            onClick={() => setSearchVariant("name")}
          >
            по имени
          </span>
          <span
            className={`${
              searchVariant === "bar-code"
                ? "text-darkV-400 underline dark:text-lightW-200"
                : "text-darkG-100"
            }`}
            onClick={() => setSearchVariant("bar-code")}
          >
            по штрих коду
          </span>
        </div>

        <input
          className="min-w-[280px]"
          type={searchVariant === "name" ? "text" : "number"}
          placeholder={
            searchVariant === "name"
              ? "Введите название товара"
              : "Введите 4 любые цифры товара"
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
      </div>

      <div className="flex flex-col gap-1">
        {searchTerm.length >= 4
          ? searchResults.map((item) => (
              <Link
                href={`posts/${item.id}`}
                key={item.id}
                className="Search__item flex flex-col gap-0"
              >
                <div className="flex flex-row justify-between gap-2 text-sm">
                  <span className="flex flex-wrap">{item.name}</span>
                  <span>{item.quantity} шт.</span>
                </div>
                <div className="text-sm text-darkG-100">
                  <span>{item.code}</span>
                </div>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};
