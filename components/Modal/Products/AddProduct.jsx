import "./index.scss";

import { useState, useEffect } from "react";

import { db } from "@/lib/firebase";
import { UserAuth } from "@/context/AuthContext";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";

import moment from "moment/min/moment-with-locales";
import Moment from "react-moment";
Moment.globalMoment = moment;
Moment.globalLocale = "ru";
import {
  calcEndOfTerm,
  calcEndOfTermInfo,
  converRuToUTC,
  isValidDate,
} from "../../../utils/date";

import { LoadingButton } from "@/components/Button/LoadButton/LoadButton";

const AddProduct = () => {
  const { user } = UserAuth();
  const [shelfSelect, setShelfSelect] = useState("date");
  const [daysLeft, setDaysLeft] = useState("");
  const [productError, setProductError] = useState("");

  const category = ["Косметика", "Продукты", "Алкоголь", "Химия", "Другое"];

  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    watch,
  } = useForm();

  const onCreate = async (data) => {
    try {
      const docRef = await toast.promise(
        addDoc(collection(db, "products"), {
          name: data.name,
          category: data.category,
          code: data.code,
          date_1: data.date_1,
          date_2:
            shelfSelect == "date"
              ? data.date_2
              : calcEndOfTerm(data.date_1, data.date_2),
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
      e.message ? setProductError("Ошибка ") : "";
    }
  };

  useEffect(() => {
    const subscription = watch((value) => {
      shelfSelect == "date"
        ? setDaysLeft(converRuToUTC(value.date_2))
        : setDaysLeft(calcEndOfTermInfo(value.date_1, value.date_2));
    });
    return () => subscription.unsubscribe();
  }, [watch, shelfSelect]);

  return (
    <div className="AddUpdate flex flex-col justify-center gap-5 max-w-[600px]">
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
              <Controller
                control={control}
                {...register("date_1", {
                  required: "Укажите дату производства",
                })}
                render={({ field }) => (
                  <IMaskInput
                    mask={Date}
                    min={new Date(2018, 0, 1)}
                    max={new Date(2050, 0, 1)}
                    onChange={(date) => field.onChange(date)}
                    placeholder="00.00.0000"
                  />
                )}
              />
            </div>

            <div className="AddUpdate__form__input">
              <select
                defaultValue="date"
                onChange={(e) => setShelfSelect(e.target.value)}
                className="AddUpdate__form__select p-0 h-6"
              >
                <option value="date">Годен до:</option>
                <option value="month">Годен месяцев:</option>
              </select>
              {shelfSelect == "date" ? (
                <Controller
                  control={control}
                  {...register("date_2", {
                    required: "Укажите дату просрочки",
                  })}
                  render={({ field }) => (
                    <IMaskInput
                      mask={Date}
                      min={new Date(2018, 0, 1)}
                      max={new Date(2050, 0, 1)}
                      onChange={(date) => field.onChange(date)}
                      placeholder="00.00.0000"
                    />
                  )}
                />
              ) : (
                <input
                  type="number"
                  autoComplete="off"
                  {...register("date_2", {
                    required: "Введите количество месяцев",
                    min: {
                      value: 1,
                      message: "Мин. кол. месяцев 1",
                    },
                    max: {
                      value: 120,
                      message: "Макс. кол. месяцев 120",
                    },
                  })}
                />
              )}
              {isValidDate(daysLeft) ? (
                <Moment fromNow toNow>
                  {daysLeft}
                </Moment>
              ) : null}
            </div>
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
                {category.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="AddUpdate__form__input max-w-[100%] sm:max-w-[25%]">
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
          text="Добавить"
        />
      </form>
    </div>
  );
};

export { AddProduct };
