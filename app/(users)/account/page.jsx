"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { useAuth } from "@/hooks/use-auth";
import { removeUser } from "@/store/slices/userSlice";

import { BsBoxArrowInLeft } from "react-icons/bs";
import { TopBar } from "@/components/TopBar/TopBar";
import { IcButton } from "@/components/Button/IcButton/IcButton";
import { Modal } from "@/components/Modal/Modal";
import { EditAccount } from "@/components/Forms/Account/EditAccount";
import SignIn from "@/components/Forms/Auth/SignIn";

// export const metadata = {
//   title: "Профиль - ShelfX",
//   description: "",
// };

export default function Account() {
  const dispatch = useDispatch();
  const { isAuth, email, id } = useAuth();

  const [editModalActive, setEditModalActive] = useState(false);

  return (
    <div className="flex flex-col basis-full">
      <TopBar
        tittle={isAuth ? email : "Гость"}
        subtittle={isAuth ? <p className="text-[12px]">ID: {id}</p> : null}
      />
      <div className="flex flex-col justify-between basis-full">
        {isAuth ? (
          <div className="text-lg py-4">
            <p>
              Эл. адресс: <a href={`mailto:${email}`}>{email}</a>
            </p>
          </div>
        ) : (
          <div className="flex flex-col basis-full justify-center content-center">
            <SignIn />
          </div>
        )}

        <div className="flex flex-row justify-between py-4">
          {isAuth ? (
            <IcButton
              className="w-full"
              onClick={() => dispatch(removeUser())}
              text="Выйти"
            />
          ) : null}
        </div>
      </div>

      <Modal active={editModalActive} setActive={setEditModalActive}>
        <EditAccount />
      </Modal>
    </div>
  );
}