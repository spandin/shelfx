import "./_index.scss";

import Link from "next/link";
import { useState, useEffect } from "react";

import { db } from "@/lib/firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

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

      isActive(productsArr);

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
      <h3 className="Search px-[3px]">Поиск продукта</h3>

      <input
        type="number"
        placeholder="Введите 4 любые цифры"
        value={searchTerm}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-1">
        {searchTerm.length >= 4
          ? searchResults.map((item) => (
              <div key={item.id} className="Search__item flex flex-col gap-0">
                <Link href={`products/${item.id}`}>
                  {item.name} - {item.quantity} шт.{" "}
                </Link>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
