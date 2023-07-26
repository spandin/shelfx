"use client";

import "./account_page.scss";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { useAuth } from "@/hooks/use-auth";
import { removeUser } from "@/store/slices/userSlice";

import { MdEdit, MdLogout, MdLogin } from "react-icons/md";
import { IcButton } from "@/components/Button/IcButton/IcButton";
import { Modal } from "@/components/Modal/Modal";
import { EditAccount } from "@/components/Modal/Account/EditAccount";
import SignIn from "@/components/Modal/Auth/SignIn";

// export const metadata = {
//   title: "Профиль - ShelfX",
//   description: "",
// };

export default function Account() {
  const dispatch = useDispatch();
  const { isAuth, email, id } = useAuth();

  const [editModalActive, setEditModalActive] = useState(false);
  const [singInModalActive, setSingInModalActive] = useState(false);

  return (
    <div className="Account min-w-sceen flex w-full flex-col">
      <div className="Account__info flex flex-row content-center gap-4 p-5 lg:rounded-t-lg">
        <div className="flex flex-col justify-center">
          <h1>{isAuth ? email : "Гость"}</h1>
          {isAuth ? <p className="text-[12px]">ID: {id}</p> : null}
        </div>
      </div>

      <div className="Account__body flex flex-col gap-2 basis-full bg-darkD-300 px-3 py-5 lg:px-5">
        {isAuth ? (
          <div>
            <p>
              Email: <a href={`mailto:${email}`}>{email}</a>
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

      <div className="Account__toolbar flex justify-between gap-4 p-3 min-h-[64px] lg:rounded-b-lg ">
        {isAuth ? (
          <IcButton
            className="IcButtonA"
            onClick={() => setEditModalActive(true)}
            icon={<MdEdit />}
            text="Обновить"
          />
        ) : null}

        {isAuth ? (
          <IcButton
            className="IcButtonA flex lg:hidden"
            onClick={() => dispatch(removeUser())}
            text="Выйти"
            icon={<MdLogout />}
          />
        ) : (
          <IcButton
            className="IcButtonA flex lg:hidden"
            onClick={() => setSingInModalActive(true)}
            text="Войти"
            icon={<MdLogin />}
          />
        )}

        <Modal active={singInModalActive} setActive={setSingInModalActive}>
          <SignIn />
        </Modal>

        <Modal active={editModalActive} setActive={setEditModalActive}>
          <EditAccount />
        </Modal>
      </div>
    </div>
  );
}
