"use client";

import "./_index.scss";

import { useState, useEffect } from "react";

import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";

import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { Scanner } from "@codesaursx/react-scanner";

import { toast } from "react-toastify";
import { toastAuthErr, settings } from "@/lib/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsCameraFill } from "react-icons/bs";

import Moment from "react-moment";
import "moment/locale/ru";
Moment.globalLocale = "ru";

import {
  calcEndOfTerm,
  calcEndOfTermInfo,
  convertRuToUTC,
  isValidDate,
} from "@/lib/date";

import { LoadingButton } from "@/components/Button/LoadButton/LoadButton";
import { Modal } from "@/components/Modal/Modal";

const AddPost = () => {
  const { isAuth, email } = useAuth();

  const [scannerModalActive, setScannerModalActive] = useState(false);

  const [shelfSelect, setShelfSelect] = useState("date");
  const [daysLeft, setDaysLeft] = useState(0);

  const [productError, setProductError] = useState("");

  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    setValue,
    getValues,
  } = useForm({ mode: "onSubmit" });

  const onCreate = async (data) => {
    try {
      const docRef = await toast.promise(
        addDoc(collection(db, "data"), {
          name: data.name,
          category: data.category,
          code: data.code,
          quantity: data.quantity,
          date_1: data.date_1,
          date_2:
            shelfSelect == "date"
              ? data.date_2
              : calcEndOfTerm(data.date_1, data.date_2),
          dateAdded: new Date().toLocaleDateString("ru-Ru"),
          whoAdded: email,
        }),
        {
          pending: "Загрузка на сервер",
          success: "Загружено успешно",
          error: "Ошибка при добавлении",
        },
        settings,
      );

      await updateDoc(doc(db, "data", docRef.id), {
        id: docRef.id,
      });

      await setDoc(doc(db, "products", data.code), {
        code: data.code,
        name: data.name,
        category: data.category,
      });

      reset();
    } catch (e) {
      console.log(`AddProduct`, e.message);
      e.message ? setProductError("Ошибка ") : "";
    }
  };

  useEffect(() => {
    const subscription = watch((value) => {
      shelfSelect == "date"
        ? setDaysLeft(convertRuToUTC(value?.date_2))
        : setDaysLeft(calcEndOfTermInfo(value?.date_1, value?.date_2));

      // for search products of code in inputs
      onSnapshot(doc(db, "products", getValues("code")), (doc) => {
        const data = doc.data();
        setValue("name", data.name);
        setValue("category", data.category);
      });
    });

    return () => subscription.unsubscribe();
  }, [watch, getValues, setValue, shelfSelect, daysLeft]);

  return (
    <div className="AddUpdate flex flex-col gap-5">
      <h3>Добавление продукта</h3>
      <form
        className="Add__form flex flex-col justify-between "
        onSubmit={handleSubmit(onCreate)}
        noValidate
      >
        <div className="flex flex-col  justify-center gap-2">
          <div className="flex flex-row items-center gap-4">
            <div className="Add__form__input">
              <label for="code">Штрих код:</label>
              <div className="flex flex-row items-center gap-6">
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
                <BsCameraFill
                  className="mr-2 text-2xl"
                  onClick={() => setScannerModalActive(true)}
                />
              </div>
            </div>
          </div>

          <div className="Add__form__input">
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

          <div className="Add__form__category-quantity flex flex-row flex-wrap gap-5">
            <div className="Add__form__input">
              <label for="category">Категория:</label>
              <select
                name="category"
                {...register("category", {
                  required: "Выберите категорию",
                })}
              >
                <option value="Косметика">Косметика</option>
                <option value="Продукты">Продукты</option>
                <option value="Алкоголь">Алкоголь</option>
                <option value="Химия">Химия</option>
                <option value="Другое">Другое</option>
              </select>
            </div>

            <div className="Add__form__input max-w-[100%] sm:max-w-[25%]">
              <label for="quantity">Количество:</label>
              <input
                placeholder="1-99"
                type="number"
                defaultValue={1}
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

          <div className="Add__form__date flex flex-row flex-wrap gap-5">
            <div className="Add__form__input">
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

            <div className="Add__form__input">
              <select
                defaultValue="date"
                onChange={(e) => {
                  setShelfSelect(e.target.value), setDaysLeft(null);
                }}
                className="Add__form__select h-6 p-0"
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

          <p className="postError">
            {productError ||
              (errors?.code && errors?.code?.message) ||
              (errors?.name && errors?.name?.message) ||
              (errors?.category && errors?.category?.message) ||
              (errors?.quantity && errors?.quantity?.message) ||
              (errors?.date_1 && errors?.date_1?.message) ||
              (errors?.date_2 && errors?.date_2?.message)}
          </p>
        </div>

        <LoadingButton
          className="Add__form__button"
          type="submit"
          disabled={true}
          isLoading={isSubmitting}
          text="Добавить"
          onClick={isAuth ? () => null : toastAuthErr}
        />
      </form>

      <Modal active={scannerModalActive} setActive={setScannerModalActive}>
        <div className="flex flex-col gap-2">
          <h3>Сканирование</h3>
          <p className="text-sm text-darkG-100">Наведите камеру на штрих код</p>
          <Scanner
            delay={500}
            onUpdate={(e, data) => {
              if (data) {
                setValue("code", data.getText());
                setScannerModalActive(false);
              }
            }}
            stopStream={scannerModalActive === true ? false : true}
          />
        </div>
      </Modal>

      <ToastContainer limit={1} />
    </div>
  );
};

export { AddPost };
