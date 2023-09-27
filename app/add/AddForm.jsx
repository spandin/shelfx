"use client";

import "./_index.scss";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, setProduct } from "@/store/slices/postSlice";
import { setSelectType, setShelfTime } from "@/store/slices/formSlice";

import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

import { useAuth } from "@/hooks/use-auth";

import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";

import { toast } from "react-toastify";
import { toastAuthErr, settings } from "@/lib/toast";

import { BsCameraFill } from "react-icons/bs";

import { LoadingButton } from "@/components/Button/LoadButton/LoadButton";
import { Modal } from "@/components/Modal/Modal";
import { Toast } from "@/components/Toast";

import { BarCodeScanner } from "./BarCodeScanner";
import { EndOfTermInformer, EndOfTermWatcher } from "./EndOfTermInformer";

const AddForm = () => {
  const dispatch = useDispatch();

  const { isAuth, email } = useAuth();
  const { selectType } = useSelector((state) => state.form);

  const [scannerModalActive, setScannerModalActive] = useState(false);

  const [productError, setProductError] = useState("");

  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
  } = useForm({ mode: "onChange" });

  const onCreate = async (data) => {
    try {
      await toast.promise(
        dispatch(addPost({ data, email, selectType })),
        {
          pending: "Загрузка на сервер",
          success: "Загружено успешно",
          error: "Ошибка при добавлении",
        },
        settings,
      );

      dispatch(setProduct(data));

      reset();
    } catch (e) {
      console.log(`AddProduct`, e.message);
      e.message ? setProductError("Ошибка: " + e.massage) : null;
    }
  };

  EndOfTermWatcher(watch);

  const getProductsInfo = async () => {
    const docRef = doc(db, "products", getValues("code"));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setValue("name", docSnap.data().name);
      setValue("category", docSnap.data().category);
    }
  };

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
                  onChange={getProductsInfo()}
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
                defaultValue={selectType}
                onChange={(e) => {
                  dispatch(setSelectType(e.target.value)),
                    dispatch(setShelfTime(0));
                }}
                className="Add__form__select h-6 p-0"
              >
                <option value="fullDate">Годен до:</option>
                <option value="month">Годен месяцев:</option>
              </select>
              {selectType === "fullDate" ? (
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

              <EndOfTermInformer />
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
          className="Add__form__button text-base"
          type="submit"
          disabled={true}
          isLoading={isSubmitting}
          text="Добавить"
          onClick={isAuth ? () => null : toastAuthErr}
        />
      </form>

      <Modal active={scannerModalActive} setActive={setScannerModalActive}>
        <BarCodeScanner
          scannerModalActive={scannerModalActive}
          setScannerModalActive={setScannerModalActive}
        />
      </Modal>

      <Toast />
    </div>
  );
};

export { AddForm };
