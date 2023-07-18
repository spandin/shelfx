"use client";

import "./index.scss";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { db } from "@/lib/firebase";
import { query, collection, onSnapshot } from "firebase/firestore";
import { UserAuth } from "@/context/AuthContext";

import { isActive } from "@/utils/sort";

import { MdList, MdHistory, MdLogin, MdLogout } from "react-icons/md";
import { IcButton } from "../Button/IcButton/IcButton";
import { Modal } from "../Modal/Modal";
import SignIn from "../Modal/Auth/SignIn";

const Aside = () => {
  const pathname = usePathname();
  const { logout, user } = UserAuth();
  const [prodCount, setProdCount] = useState(Number);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let productsArr = [];

      querySnapshot.forEach((doc) => {
        productsArr.push({ ...doc.data(), id: doc.id });
      });

      setProdCount(Object.keys(isActive(productsArr)).length);
    });
    return () => unsubscribe();
  }, []);

  return (
    <aside
      className="Aside 
        flex basis-16 
        content-center justify-center bg-darkD-200 px-5 py-2 
        lg:flex lg:max-h-screen lg:basis-96 lg:bg-darkD-100 lg:flex-col lg:justify-between
        lg:px-8 lg:py-8
        "
    >
      <section
        className="flex w-full flex-row items-center justify-between gap-6
            lg:flex-col lg:items-start lg:justify-start lg:gap-24
            "
      >
        <Link href="/account" className="User flex items-center gap-5">
          <div
            className="User__Avatar 
                        relative h-[40px] w-[40px] rounded-full
                        lg:h-[50px] lg:w-[50px]
                    "
          >
            <span className="absolute inset-1.5 text-center lg:inset-3">
              {user ? String(user?.email).charAt(0) : "Г"}
            </span>
          </div>
          <div className="User__Name hidden lg:flex">
            {user ? user.email : "Гость"}
          </div>
        </Link>

        <nav className="Menu flex flex-row lg:w-full lg:flex-col">
          <Link
            className={`
            ${pathname == "/products" ? "active" : ""}
            Menu__Link gap-[5px] px-3 text-[0px]
            lg:gap-[15px] lg:px-5 lg:text-[18px] 
            `}
            href="/products"
          >
            <MdList /> Список
            <span className="Menu__Counter flex h-[18px] items-center justify-center px-[5px] lg:h-[24px]">
              {prodCount}
            </span>
          </Link>
          <Link
            className={`
            ${pathname == "/history" ? "active" : ""}
            Menu__Link px-3 text-[0px] 
            lg:gap-[15px] lg:px-5 lg:text-[18px]
            `}
            href="/history"
          >
            <MdHistory /> История
          </Link>
        </nav>
      </section>

      {user ? (
        <IcButton
          className="Logout-btn hidden lg:flex"
          onClick={() => logout()}
          text="Выход из аккаунта"
          icon={<MdLogout />}
        />
      ) : (
        <IcButton
          className="Login-btn hidden lg:flex"
          onClick={() => setModalActive(true)}
          text="Войти"
          icon={<MdLogin />}
        />
      )}

      <Modal active={user ? null : modalActive} setActive={setModalActive}>
        <SignIn />
      </Modal>
    </aside>
  );
};

export { Aside };
