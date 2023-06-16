"use client";

import { useState } from "react";

import { UserAuth } from "@/context/AuthContext";

import { toastAuthErr } from "@/lib/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdAdd, MdFilterList, MdSaveAlt } from "react-icons/md";
import { IcButton } from "@/components/Buttons/IcButton/IcButton";
import { Modal } from "@/components/Modal/Modal";
import { AddProduct } from "@/components/Modal/Product/AddProduct";

export const ProductsNav = () => {
  const { user } = UserAuth();
  const [modalActive, setModalActive] = useState(false);

  return (
    <nav className="Products__nav flex gap-3 p-3">
      <IcButton
        className="IcButtonA"
        onClick={user ? () => setModalActive(true) : toastAuthErr}
        icon={<MdAdd />}
        text="Добавить"
      />
      <IcButton
        className="IcButtonA"
        // onClick={}
        icon={<MdFilterList />}
        text="Фильтр"
      />
      <IcButton
        className="IcButtonA"
        // onClick={}
        icon={<MdSaveAlt />}
        text="Экспорт XLSX"
      />

      <ToastContainer limit={1} theme="dark" position="bottom-center" />
      <Modal active={modalActive} setActive={setModalActive}>
        <AddProduct />
      </Modal>
    </nav>
  );
};
