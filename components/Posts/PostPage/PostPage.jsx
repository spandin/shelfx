"use client";

import { useState, useEffect } from "react";

import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";

import { toastAuthErr } from "@/lib/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BsPencilSquare, BsTrash2 } from "react-icons/bs";
import { IcButton } from "@/components/Button/IcButton/IcButton";
import { DeletePost } from "@/components/Forms/Posts/DeletePost";
import { UpdatePost } from "@/components/Forms/Posts/UpdatePost";
import { Modal } from "@/components/Modal/Modal";
import { TopBar } from "@/components/TopBar/TopBar";

const PostPage = ({ params }) => {
  const { isAuth } = useAuth();
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [updateModalActive, setUpdateModalActive] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "data", `${params.id}`), (doc) => {
      let currentProduct = doc.data();

      setProduct(currentProduct);
    });
    return () => unsubscribe();
  }, [params.id]);

  return (
    <div className="Product flex flex-col basis-full">
      <TopBar />
      <div className="flex flex-col justify-between basis-full">
        <div className="text-[16px] bg-darkV-200 rounded-[10px] border-[1px] border-solid border-darkV-100">
          <div className="flex flex-col gap-1 p-4 rounded-t-[10px] bg-darkV-400">
            <h3>{product?.name}</h3>
            <div className="flex flex-row justify-between text-darkG-100 text-sm">
              <p> {product?.category} </p>
              <p>{product?.quantity} ШТ.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-row justify-between">
              <p>Дата изготовления: {product?.date_1}</p>
              <p>Дата просрочки: {product?.date_2}</p>
            </div>

            <div className="flex flex-row justify-between">
              <p>Добавил: {product?.whoAdded}</p>
              <p>Дата добавления: {product?.dateAdded}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between py-4">
          <IcButton
            className="IcButtonA"
            onClick={isAuth ? () => setUpdateModalActive(true) : toastAuthErr}
            icon={<BsPencilSquare />}
          />
          <IcButton
            className="IcButtonA"
            onClick={isAuth ? () => setDeleteModalActive(true) : toastAuthErr}
            icon={<BsTrash2 />}
          />
        </div>
      </div>

      <Modal active={updateModalActive} setActive={setUpdateModalActive}>
        <UpdatePost product={product} id={params.id} />
      </Modal>

      <Modal active={deleteModalActive} setActive={setDeleteModalActive}>
        <DeletePost name={product?.name} id={params.id} />
      </Modal>

      <ToastContainer limit={1} />
    </div>
  );
};

export { PostPage };
