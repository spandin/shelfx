"use client";

import "./_index.scss";

import { useState, useEffect } from "react";

import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";

import { toastAuthErr } from "@/lib/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdEdit, MdDelete } from "react-icons/md";
import { IcButton } from "@/components/Button/IcButton/IcButton";
import { DeleteProduct } from "@/components/Forms/Products/DeleteProduct";
import { UpdateProduct } from "@/components/Forms/Products/UpdateProduct";
import { Modal } from "@/components/Modal/Modal";
import { TopBar } from "@/components/TopBar/TopBar";

const Product = ({ params }) => {
  const { isAuth, email } = useAuth();
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [updateModalActive, setUpdateModalActive] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "products", `${params.id}`),
      (doc) => {
        let currentProduct = doc.data();

        setProduct(currentProduct);
      }
    );
    return () => unsubscribe();
  }, [params.id]);

  return (
    <div className="Product flex flex-col basis-full">
      <TopBar tittle={product?.name} subtittle={product?.code} />
      <div className="flex flex-col justify-between basis-full">
        <div className="text-[16px] py-4">
          <p>Категория: {product?.category}</p>
          <p>Дата добавления: {product?.dateAdded}</p>
          <p>Дата изготовления: {product?.date_1}</p>
          <p>Дата просрочки: {product?.date_2}</p>
          <p>Добавил: {product?.whoAdded}</p>
        </div>

        <div className="flex flex-row justify-between">
          <IcButton
            className="IcButtonA"
            onClick={isAuth ? () => setUpdateModalActive(true) : toastAuthErr}
            icon={<MdEdit />}
          />
          <IcButton
            className="IcButtonA"
            onClick={isAuth ? () => setDeleteModalActive(true) : toastAuthErr}
            icon={<MdDelete />}
          />
        </div>
      </div>

      <Modal active={updateModalActive} setActive={setUpdateModalActive}>
        <UpdateProduct product={product} id={params.id} />
      </Modal>

      <Modal active={deleteModalActive} setActive={setDeleteModalActive}>
        <DeleteProduct name={product?.name} id={params.id} />
      </Modal>

      <ToastContainer limit={1} />
    </div>
  );
};

export { Product };
