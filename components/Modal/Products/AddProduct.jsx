import "./index.scss";

import { useState } from "react";

import { db } from "@/lib/firebase";
import { UserAuth } from "@/context/AuthContext";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { LoadingButton } from "@/components/Button/LoadButton/LoadButton";

const AddProduct = () => {
  const { user } = UserAuth();
  const [productError, setProductError] = useState("");

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  const error =
    productError ||
    (errors?.name && errors?.name?.message) ||
    (errors?.code && errors?.code?.message) ||
    (errors?.date_1 && errors?.date_1?.message) ||
    (errors?.date_2 && errors?.date_2?.message) ||
    (errors?.quentity && errors?.quentity?.message);

  const onCreate = async (data, e) => {
    e.preventDefault();
    try {
      const docRef = await toast.promise(
        addDoc(collection(db, "products"), {
          name: data.name,
          code: data.code,
          date_1: new Date(data.date_1).toLocaleDateString("ru-Ru"),
          date_2: new Date(data.date_2).toLocaleDateString("ru-Ru"),
          quantity: data.quantity,
          dateAdded: new Date().toLocaleDateString("ru-Ru"),
          whoAdded: user.email,
          isActive: true,
        }),
        {
          pending: "Загрузка на сервер",
          success: "Загружено успешно",
          error: "Ошибка при добавлении",
        }
      );
      await updateDoc(doc(db, "products", docRef.id), {
        id: docRef.id,
      }),
        reset();
    } catch (e) {
      console.log(`AddProduct`, e.message);
      e.message ? setProductError("Проверьте подключение к сети") : "";
    }
  };
  return (
    <div className="AddUpdate flex flex-col justify-center gap-5">
      <div className="AddUpdate__info">
        <h2 className="AddUpdate__info__tittle px-[3px]">Добавить продукт</h2>
      </div>

      <form
        className="AddUpdate__form flex flex-col justify-center gap-[10px]"
        onSubmit={handleSubmit(onCreate)}
        noValidate
      >
        <div className="flex flex-col justify-center gap-[15px]">
          <div className="AddUpdate__form__input">
            <label for="name">Наименование:</label>
            <input
              placeholder="Nestle Decoration 75g"
              type="text"
              autoComplete="off"
              {...register("name", {
                required: "Введите название",
                minLength: {
                  value: 8,
                  message: "Минимальная длина 8 символов",
                },
                maxLength: {
                  value: 50,
                  message: "Максимальная длина 50 символов",
                },
              })}
            />
          </div>

          <div className="AddUpdate__form__input">
            <label for="code">Штрих код:</label>
            <input
              placeholder="8600012345678900"
              type="number"
              autoComplete="off"
              {...register("code", {
                required: "Введите штрих код",
                minLength: {
                  value: 6,
                  message: "Минимальная длина 6 символов",
                },
                maxLength: {
                  value: 16,
                  message: "Максимальная длина 16 символов",
                },
              })}
            />
          </div>
          <div className="AddUpdate__form__date flex flex-row flex-wrap gap-5">
            <div className="AddUpdate__form__input">
              <label for="date_1">Годен от:</label>
              <input
                type="datetime-local"
                autoComplete="off"
                {...register("date_1", {
                  required: "Укажите дату производства",
                })}
              />
            </div>

            <div className="AddUpdate__form__input">
              <label for="date_2">Годен до:</label>
              <input
                type="datetime-local"
                autoComplete="off"
                {...register("date_2", {
                  required: "Укажите дату просрочки",
                })}
              />
            </div>
          </div>
          <div className="AddUpdate__form__input">
            <label for="quantity">Количество:</label>
            <input
              placeholder="1-99"
              type="number"
              autoComplete="off"
              {...register("quantity", {
                required: "Введите количество",
                min: {
                  value: 1,
                  message: "Минимальное число 1",
                },
                max: {
                  value: 99,
                  message: "Максимальное число 99",
                },
              })}
            />
          </div>
        </div>

        <p className="productError">{error}</p>

        <LoadingButton
          className="AddUpdate__form__button"
          type="submit"
          disabled={true}
          isLoading={isSubmitting}
          text="Добавить"
        />
      </form>
    </div>
  );
};

export { AddProduct };
