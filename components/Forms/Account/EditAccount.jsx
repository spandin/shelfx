import "./_index.scss";

import { useState } from "react";

import { db } from "@/lib/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { LoadingButton } from "@/components/Button/LoadButton/LoadButton";

const EditAccount = () => {
  const { user } = useAuth();
  const [productError, setProductError] = useState("");

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  const error = productError || (errors?.name && errors?.name?.message);

  const onUpdate = async (data, e) => {
    e.preventDefault();
    try {
      await toast.promise(
        setDoc(doc(db, "users", user.uid), {
          name: data.name,
          email: user.email,
        }),
        {
          pending: "Загрузка на сервер",
          success: "Обновлено успешно",
          error: "Ошибка при обновлении",
        }
      );
    } catch (e) {
      console.log(`Edit Account`, e.message);
      e.message ? setProductError("Проверьте подключение к сети") : "";
    }
  };

  return (
    <div className="EditAccount flex flex-col justify-center gap-5 max-w-[600px]">
      <div className="EditAccount__info">
        <h2 className="EditAccount__info__tittle px-[3px]">
          Редактировать профиль
        </h2>
      </div>

      <form
        className="EditAccount__form flex flex-col justify-center gap-[10px]"
        onSubmit={handleSubmit(onUpdate)}
        noValidate
      >
        <div className="flex flex-col justify-center gap-[15px]">
          <div className="EditAccount__form__input">
            <label for="name">Имя:</label>
            <input
              type="text"
              autoComplete="off"
              defaultValue={user?.name}
              {...register("name", {
                required: "Введите название",
                minLength: {
                  value: 4,
                  message: "Минимальная длина 4 символов",
                },
                maxLength: {
                  value: 20,
                  message: "Максимальная длина 20 символов",
                },
              })}
            />
          </div>
        </div>

        <p className="error">{error}</p>

        <LoadingButton
          className="EditAccount__form__button"
          type="submit"
          disabled={true}
          isLoading={isSubmitting}
          text="Обновить"
        />
      </form>
    </div>
  );
};

export { EditAccount };
