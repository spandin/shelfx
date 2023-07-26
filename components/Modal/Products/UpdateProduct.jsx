import "./index.scss";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { db } from "@/lib/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { LoadingButton } from "@/components/Button/LoadButton/LoadButton";

const UpdateProduct = ({ product, id }) => {
  const router = useRouter();

  const { email } = useAuth();
  const [productError, setProductError] = useState("");

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  const onUpdate = async (data, e) => {
    e.preventDefault();
    try {
      await toast.promise(
        updateDoc(doc(db, "products", id), {
          id: id,
          name: data.name,
          category: data.category,
          code: data.code,
          date_1: data.date_1,
          date_2: data.date_2,
          quantity: data.quantity,
          dateUpdated: new Date().toLocaleDateString("ru-Ru"),
          whoUpdated: email,
        }),
        {
          pending: "Загрузка на сервер",
          success: "Обновлено успешно",
          error: "Ошибка при обновлении",
        }
      );
      router.push(`/products/${id}`);
    } catch (e) {
      console.log(`Update Product`, e.message);
      e.message ? setProductError("Проверьте подключение к сети") : "";
    }
  };

  return (
    <div className="AddUpdate flex flex-col justify-center gap-5 max-w-[600px]">
      <div className="AddUpdate__info">
        <h3 className="AddUpdate__info__tittle px-[3px]">Обновить продукт</h3>
      </div>

      <form
        className="AddUpdate__form flex flex-col justify-center gap-[10px]"
        onSubmit={handleSubmit(onUpdate)}
        noValidate
      >
        <div className="flex flex-col justify-center gap-[15px]">
          <div className="AddUpdate__form__input">
            <label for="code">Штрих код:</label>
            <input
              placeholder="8600012345678900"
              type="number"
              autoComplete="off"
              defaultValue={product?.code}
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

          <div className="AddUpdate__form__input">
            <label for="name">Наименование:</label>
            <input
              placeholder="Nestle Decoration 75g"
              type="text"
              autoComplete="off"
              defaultValue={product?.name}
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

          <div className="AddUpdate__form__category-quantity flex flex-row flex-wrap gap-5">
            <div className="AddUpdate__form__input">
              <label for="category">Категория:</label>
              <select
                name="category"
                {...register("category", {
                  required: "Выберите категорию",
                })}
              >
                <option
                  value="Косметика"
                  selected={product?.category == "Косметика" ? true : false}
                >
                  Косметика
                </option>
                <option
                  value="Продукты"
                  selected={product?.category == "Продукты" ? true : false}
                >
                  Продукты
                </option>
                <option
                  value="Алкоголь"
                  selected={product?.category == "Алкоголь" ? true : false}
                >
                  Алкоголь
                </option>
                <option
                  value="Химия"
                  selected={product?.category == "Химия" ? true : false}
                >
                  Химия
                </option>
                <option
                  value="Другое"
                  selected={product?.category == "Другое" ? true : false}
                >
                  Другое
                </option>
              </select>
            </div>

            <div className="AddUpdate__form__input max-w-[100%] sm:max-w-[25%]">
              <label for="quantity">Количество:</label>
              <input
                placeholder="1-99"
                type="number"
                autoComplete="off"
                defaultValue={product?.quantity}
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

          <div className="AddUpdate__form__date flex flex-row flex-wrap gap-5">
            <div className="AddUpdate__form__input">
              <label for="date_1">Годен от:</label>
              <input
                type="text"
                autoComplete="off"
                defaultValue={product?.date_1}
                {...register("date_1", {
                  required: "Укажите дату производства",
                })}
              />
            </div>

            <div className="AddUpdate__form__input">
              <label for="date_2">Годен до:</label>
              <input
                type="text"
                autoComplete="off"
                defaultValue={product?.date_2}
                {...register("date_2", {
                  required: "Укажите дату просрочки",
                })}
              />
            </div>
          </div>
        </div>

        <p className="productError">
          {productError ||
            (errors?.name && errors?.name?.message) ||
            (errors?.code && errors?.code?.message) ||
            (errors?.date_1 && errors?.date_1?.message) ||
            (errors?.date_2 && errors?.date_2?.message) ||
            (errors?.category && errors?.category?.message) ||
            (errors?.quantity && errors?.quantity?.message)}
        </p>

        <LoadingButton
          className="AddUpdate__form__button"
          type="submit"
          disabled={true}
          isLoading={isSubmitting}
          text="Обновить"
        />
      </form>
    </div>
  );
};

export { UpdateProduct };
