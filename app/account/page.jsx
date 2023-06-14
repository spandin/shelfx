"use client";

import "./Account.scss";

import { db } from "@/lib/firebase";
import { UserAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

import { MdEdit, MdLogout, MdLogin } from "react-icons/md";
import { IcButton } from "@/components/IcButton/IcButton";
import { Modal } from "@/components/Modal/Modal";
import SignIn from "@/components/Auth/SignIn";

// export const metadata = {
//   title: "Профиль - ShelfX",
//   description: "",
// };

export default function Account() {
  const { logout, user } = UserAuth();
  const [modalActive, setModalActive] = useState(false);

  return (
    <div className="Account min-w-sceen flex w-full flex-col">
      <div className="Account__info flex flex-row content-center gap-4 p-5 lg:rounded-t-lg">
        <div className="flex flex-col justify-center">
          <h1>{user ? user?.email : "Гость"}</h1>
          {user ? <p className="text-[12px]">ID: {user?.uid}</p> : null}
        </div>
      </div>

      <div className="Account__body flex flex-col gap-2 basis-full bg-darkD-300 px-3 py-5 lg:px-5">
        {user ? (
          <div>
            <p>
              Email: <a href={`mailto:${user?.email}`}>{user?.email}</a>
            </p>
            <p>Телефон: </p>
            <p>Продуктов добавил: </p>
          </div>
        ) : (
          <div>
            <p>Войдите в аккаунт</p>
          </div>
        )}
      </div>

      <div className="Account__toolbar flex justify-between gap-4 p-3 lg:rounded-b-lg ">
        <IcButton
          className="IcButtonA"
          onClick={() => setModalActive(true)}
          icon={<MdEdit />}
          text="Обновить"
        />

        {user ? (
          <IcButton
            className="IcButtonA flex lg:hidden"
            onClick={() => logout()}
            text="Выйти"
            icon={<MdLogout />}
          />
        ) : (
          <IcButton
            className="IcButtonA flex lg:hidden"
            onClick={() => setModalActive(true)}
            text="Войти"
            icon={<MdLogin />}
          />
        )}

        <Modal active={modalActive} setActive={setModalActive}>
          <SignIn />
        </Modal>
      </div>
    </div>
  );
}
