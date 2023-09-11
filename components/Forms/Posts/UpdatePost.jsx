import "./_index.scss";

import { useState, useEffect } from "react";

import { db } from "@/lib/firebase";
import { updateDoc, setDoc, doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";

import { toast } from "react-toastify";
import { settings } from "@/lib/toast";
import { useForm } from "react-hook-form";

import { LoadingButton } from "@/components/Button/LoadButton/LoadButton";

const UpdatePost = ({ post, id }) => {
  const { email } = useAuth();

  const [postError, setPostError] = useState("");

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    setValue,
  } = useForm({ mode: "onSubmit" });

  const onUpdate = async (data, e) => {
    e.preventDefault();
    try {
      await toast.promise(
        updateDoc(doc(db, "data", id), {
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
        },
        settings,
      );

      await setDoc(doc(db, "products", data.code), {
        code: data.code,
        name: data.name,
        category: data.category,
      });
    } catch (e) {
      console.log(`Update Post`, e.message);
      e.message ? setPostError("Проверьте подключение к сети") : "";
    }
  };

  useEffect(() => {
    setValue("name", post.name);
    setValue("code", post.code);
    setValue("date_1", post.date_1);
    setValue("date_2", post.date_2);
    setValue("quantity", post.quantity);
  }, [id, post, setValue]);

  return (
    <div className="AddUpdate flex flex-col justify-center gap-5">
      <h3>Обновить продукт</h3>
      <form
        className="Update__form flex flex-col gap-5 "
        onSubmit={handleSubmit(onUpdate)}
        noValidate
      >
        <div className="flex flex-col justify-center gap-2">
          <div className="Update__form__input">
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

          <div className="Update__form__input">
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

          <div className="Update__form__category-quantity flex flex-row flex-wrap gap-5">
            <div className="Update__form__input">
              <label for="category">Категория:</label>
              <select
                name="category"
                {...register("category", {
                  required: "Выберите категорию",
                })}
              >
                <option
                  value="Косметика"
                  selected={post?.category == "Косметика" ? true : false}
                >
                  Косметика
                </option>
                <option
                  value="Продукты"
                  selected={post?.category == "Продукты" ? true : false}
                >
                  Продукты
                </option>
                <option
                  value="Алкоголь"
                  selected={post?.category == "Алкоголь" ? true : false}
                >
                  Алкоголь
                </option>
                <option
                  value="Химия"
                  selected={post?.category == "Химия" ? true : false}
                >
                  Химия
                </option>
                <option
                  value="Другое"
                  selected={post?.category == "Другое" ? true : false}
                >
                  Другое
                </option>
              </select>
            </div>

            <div className="Update__form__input max-w-[100%] sm:max-w-[25%]">
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

          <div className="Update__form__date flex flex-row flex-wrap gap-5">
            <div className="Update__form__input">
              <label for="date_1">Годен от:</label>
              <input
                type="text"
                autoComplete="off"
                {...register("date_1", {
                  required: "Укажите дату производства",
                })}
              />
            </div>

            <div className="Update__form__input">
              <label for="date_2">Годен до:</label>
              <input
                type="text"
                autoComplete="off"
                {...register("date_2", {
                  required: "Укажите дату просрочки",
                })}
              />
            </div>
          </div>

          <p className="postError">
            {postError ||
              (errors?.name && errors?.name?.message) ||
              (errors?.code && errors?.code?.message) ||
              (errors?.date_1 && errors?.date_1?.message) ||
              (errors?.date_2 && errors?.date_2?.message) ||
              (errors?.category && errors?.category?.message) ||
              (errors?.quantity && errors?.quantity?.message)}
          </p>
        </div>

        <LoadingButton
          className="Update__form__button"
          type="submit"
          disabled={true}
          isLoading={isSubmitting}
          text="Обновить"
        />
      </form>
    </div>
  );
};

export { UpdatePost };
