"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { db } from "@/firebase";
import { query, collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";

import { BsPersonFill } from "react-icons/bs";

const TopBar = () => {
  const { isAuth, email } = useAuth();
  const [prodCount, setProdCount] = useState(Number);

  useEffect(() => {
    const q = query(collection(db, "data"));
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
    <nav className="flex content-center justify-between py-4">
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
          className="flex h-[48px] w-[48px] flex-row content-center justify-center rounded-full 
        border-[1px] border-solid border-lightW-400 bg-lightW-200 dark:border-darkV-100 dark:bg-darkV-300"
        >
          <div className="flex flex-col content-center justify-center">
            {isAuth ? String(email).charAt(0).toUpperCase() : <BsPersonFill />}
          </div>
        </div>
      </Link>
    </nav>
  );
};

export { TopBar };
