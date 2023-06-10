"use client";

import "./Aside.scss";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { MdList, MdHistory, MdLogin, MdLogout } from "react-icons/md";
import { IcButton } from "../IcButton/IcButton";
import { Modal } from "../Modal/Modal";
import SignIn from "../Auth/SignIn";

const Aside = () => {
  const pathname = usePathname();
  const user = false;

  const [modalActive, setModalActive] = useState(false);
  return (
    <aside
      className="Aside 
        flex basis-16 
        content-center justify-center bg-darkD-100 px-5 
        lg:flex lg:max-h-screen lg:basis-96 lg:flex-col lg:justify-between
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
            <span className="absolute inset-1.5 text-center lg:inset-3">U</span>
          </div>
          <div className="User__Name hidden lg:flex">Username</div>
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
            <MdList /> Обзор
            <span className="Menu__Counter flex h-[18px] items-center justify-center px-[5px] lg:h-[24px]">
              25
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
          // onclick={() => handleLogout()}
          text="Выход из аккаунта"
          icon={<MdLogout />}
        />
      ) : (
        <IcButton
          className="Login-btn hidden lg:flex"
          onclick={() => setModalActive(true)}
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

export default Aside;
