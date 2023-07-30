"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { db } from "@/lib/firebase";
import { query, collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";

import { BsPersonFill } from "react-icons/bs";

const TopBar = () => {
  const { isAuth, email } = useAuth();
  const [prodCount, setProdCount] = useState(Number);

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let productsArr = [];

      querySnapshot.forEach((doc) => {
        productsArr.push({ ...doc.data(), id: doc.id });
      });

      setProdCount(Object.keys(productsArr).length);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="flex justify-between content-center px-1 py-4">
      <div className="flex flex-row gap-3">
        <div className="flex flex-col justify-center text-[24px] font-semibold">
          Список
          <div className="flex flex-col justify-end text-sm font-medium">
            {prodCount} позиции
          </div>
        </div>
      </div>

      <Link href="/account">
        <div
          className="flex flex-row justify-center content-center w-[48px] h-[48px] rounded-full 
        bg-darkV-300 border-[1px] border-solid border-darkV-100"
        >
          <div className="flex flex-col justify-center content-center">
            {isAuth ? String(email).charAt(0).toUpperCase() : <BsPersonFill />}
          </div>
        </div>
      </Link>
    </nav>
  );
};

export { TopBar };
