import { useState } from "react";

import { db } from "@/lib/firebase";
import { UserAuth } from "@/context/AuthContext";
import { collection, addDoc } from "firebase/firestore";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { Form } from "./Form";

const AddProduct = () => {
  const { user } = UserAuth();
  const [productError, setProductError] = useState("");

  const { reset } = useForm();

  const onCreate = async (data, e) => {
    e.preventDefault();
    try {
      await toast.promise(
        addDoc(collection(db, "products1"), {
          name: data.name,
          code: data.code,
          date_1: new Date(data.date_1).toLocaleDateString("ru-Ru"),
          date_2: new Date(data.date_2).toLocaleDateString("ru-Ru"),
          quentity: data.quentity,
          dateAdded: new Date().toLocaleDateString("ru-Ru"),
          whoAdded: user.email,
          isActive: true,
        }),
        {
          pending: "Загрузка на сервер",
          success: "Загружено успешно",
          error: "Ошибка загрузки",
        }
      );
      reset();
    } catch (e) {
      console.log(`AddProduct`, e.message);
      e.message ? setProductError("Проверьте подключение к сети") : "";
    }
  };
  return (
    <Form tittle="Добавить" onSubmit={onCreate} errorProduct={productError} />
  );
};

export { AddProduct };
