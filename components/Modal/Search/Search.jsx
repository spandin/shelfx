import "./index.scss";

import { useState, useEffect } from "react";

import { db } from "@/lib/firebase";
import { query, collection, onSnapshot } from "firebase/firestore";
import Link from "next/link";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let productsArr = [];

      querySnapshot.forEach((doc) => {
        productsArr.push({ ...doc.data(), id: doc.id });
      });

      const results = productsArr.filter((product) => {
        // product.name.toLowerCase().includes(searchTerm); поиск по имени

        return String(product.code)
          .split("")
          .reverse()
          .join("")
          .includes(searchTerm.split("").reverse().join(""));
      });

      setSearchResults(results);
    });
    return () => unsubscribe();
  }, [searchTerm]);

  return (
    <div className="Search flex flex-col gap-5 max-w-[300px] lg:max-w-[500px] lg:min-w-[500px]">
      <h2 className="Search px-[3px]">Поиск продукта</h2>

      <input
        type="number"
        placeholder="Введите штрих код"
        value={searchTerm}
        onChange={handleChange}
      />

      {searchTerm.length >= 4
        ? searchResults.map((item) => (
            <div key={item.id} className="Search__item flex flex-col gap-2">
              <Link href={`products/${item.id}`}>
                {item.name} - {item.quantity} шт.{" "}
              </Link>
            </div>
          ))
        : null}
    </div>
  );
};
