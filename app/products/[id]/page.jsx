"use client";

import "./Product.scss";

import { useState, useEffect } from "react";

import { IcButton } from "@/components/IcButton/IcButton";
import { MdEdit, MdDelete } from "react-icons/md";

import { db } from "@/lib/firebase";

import { doc, query, onSnapshot } from "firebase/firestore";

export default async function Product({ params }) {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const q = doc(db, "products", `${params.id}`);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let productArr = [];

      querySnapshot.forEach((doc) => {
        productArr.push({ ...doc.data(), id: doc.id });
      });

      setProduct(productArr);
    });
    return () => unsubscribe();
  });

  return (
    <div className="Product min-w-sceen flex w-full flex-col">
      <div className="Product__info flex flex-col bg-green-100 p-5 lg:rounded-t-lg">
        <h1></h1>
        <p className="text-[12px]">Дата добавления: 00.00.0000</p>
      </div>

      <div className="Product__body flex basis-full bg-darkD-300 p-5">
        My Post{" "}
      </div>

      <div className="Product__toolbar flex gap-4 px-5 py-4 lg:rounded-b-lg">
        <IcButton icon={<MdEdit />} />
        <IcButton icon={<MdDelete />} />
      </div>
    </div>
  );
}
