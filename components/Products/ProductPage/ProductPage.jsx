"use client";

import "./index.scss";

import { useState, useEffect } from "react";

import { UserAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

import { toastAuthErr } from "@/lib/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdEdit, MdDelete } from "react-icons/md";
import { IcButton } from "@/components/Button/IcButton/IcButton";
import { DeleteProduct } from "@/components/Modal/Products/DeleteProduct";
import { UpdateProduct } from "@/components/Modal/Products/UpdateProduct";
import { Modal } from "@/components/Modal/Modal";

const Product = ({ params }) => {
  const { user } = UserAuth();
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [updateModalActive, setUpdateModalActive] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "products", `${params.id}`),
      (doc) => {
        let data = doc.data();

        setProduct(data);
      }
    );
    return () => unsubscribe();
  }, [params.id]);

  return (
    <div className="Product min-w-sceen flex w-full flex-col">
      <div className="Product__info flex flex-col p-5 lg:rounded-t-lg">
        <h1>
          {product?.name} - {product?.quantity} шт.
        </h1>
        <p className="text-[12px]">Категория: {product?.category}</p>
        <p className="text-[12px]">Дата добавления: {product?.dateAdded}</p>
      </div>

      <div className="Product__body flex flex-col gap-2 basis-full bg-darkD-300 p-5">
        <p>Штрих код: {product?.code}</p>
        <p>Дата изготовления: {product?.date_1}</p>
        <p>Дата просрочки: {product?.date_2}</p>
        <p>Добавил: {product?.whoAdded}</p>
      </div>

      <div className="Product__toolbar flex gap-3 p-3 lg:rounded-b-lg">
        <IcButton
          className="IcButtonA"
          onClick={user ? () => setUpdateModalActive(true) : toastAuthErr}
          icon={<MdEdit />}
          text="Обновить"
        />

        <IcButton
          className="IcButtonA"
          onClick={user ? () => setDeleteModalActive(true) : toastAuthErr}
          icon={<MdDelete />}
          text="Удалить"
        />
      </div>

      <Modal active={updateModalActive} setActive={setUpdateModalActive}>
        <UpdateProduct product={product} id={params.id} />
      </Modal>

      <Modal active={deleteModalActive} setActive={setDeleteModalActive}>
        <DeleteProduct name={product?.name} id={params.id} />
      </Modal>

      <ToastContainer limit={1} theme="dark" position="bottom-center" />
    </div>
  );
};

export { Product };
