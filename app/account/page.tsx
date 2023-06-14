"use client";

import "./Account.scss";

import { db } from "@/lib/firebase";
import { UserAuth } from "@/context/AuthContext";

import { IcButton } from "@/components/IcButton/IcButton";
import { MdEdit, MdLogout } from "react-icons/md";

// export const metadata = {
//   title: "Профиль - ShelfX",
//   description: "",
// };

export default function Account() {
  const { logout, user } = UserAuth();

  return (
    <div className="Account min-w-sceen flex w-full flex-col">
      <div className="Account__info flex flex-col bg-green-100 p-5 lg:rounded-t-lg">
        <h1>{user?.email}</h1>
        <p className="text-[12px]">ID: {user?.uid}</p>
      </div>

      <div className="Account__body flex flex-col gap-2 basis-full bg-darkD-300 p-5">
        <p>
          Email: <a href={`mailto:${user?.email}`}>{user?.email}</a>
        </p>
        <p>Телефон: </p>
        <p>Продуктов добавил: </p>
      </div>

      <div className="Account__toolbar flex gap-4 px-5 py-4 lg:rounded-b-lg">
        <IcButton
          className="IcButtonA"
          icon={<MdEdit />}
          text="Обновить информацию"
        />
        <IcButton
          className="IcButtonA lg:hidden"
          icon={<MdLogout />}
          text="Выйти из аккаунта"
        />
      </div>
    </div>
  );
}
