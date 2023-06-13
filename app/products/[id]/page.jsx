"use client";

import "./Product.scss";

import { useState, useEffect } from "react";

import { IcButton } from "@/components/IcButton/IcButton";
import { MdEdit, MdDelete } from "react-icons/md";

import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function Product({ params }) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "products", `${params.id}`),
      (doc) => {
        let data = doc.data();
        console.log(data);
        setProduct(data);
      }
    );
    return () => unsubscribe();
  }, [params.id]);

  return (
    <div className="Product min-w-sceen flex w-full flex-col">
      <div className="Product__info flex flex-col bg-green-100 p-5 lg:rounded-t-lg">
        <h1>
          {product.name} - {product.quantity} шт.
        </h1>
        <p className="text-[12px]">Дата добавления: {product.dateAdded}</p>
      </div>

      <div className="Product__body flex flex-col gap-2 basis-full bg-darkD-300 p-5">
        <p>Штрих код: {product.code}</p>
        <p>Дата изготовления: {product.date_1}</p>
        <p>Дата просрочки: {product.date_2}</p>
        <p>Добавил: {product.whoAdded}</p>
      </div>

      <div className="Product__toolbar flex gap-4 px-5 py-4 lg:rounded-b-lg">
        <IcButton icon={<MdEdit />} />
        <IcButton icon={<MdDelete />} />
      </div>
    </div>
  );
}
