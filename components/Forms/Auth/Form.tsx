import "./_index.scss";

import { useForm } from "react-hook-form";

import { LoadingButton } from "@/components/Button/LoadButton/LoadButton";

const Form = ({ tittle, onSubmit, errorAuth }: any) => {
  const {
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
  } = useForm();

  return (
    <div className="Auth flex flex-col justify-center gap-[30px]">
      <form
        className="Auth__form flex flex-col justify-center gap-[10px]"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="Auth__form__inputs flex flex-col justify-center gap-[15px]">
          <input
            placeholder="your@email.com"
            type="email"
            autoComplete="off"
            {...register("email", {
              required: "Введите email и пароль",
              minLength: { value: 8, message: "Минимальная длина 8 символов" },
              maxLength: {
                value: 30,
                message: "Максимальная длина 30 символов",
              },
            })}
          />

          <input
            placeholder="Пароль"
            type="password"
            autoComplete="off"
            {...register("password", {
              required: "Введите пароль",
              minLength: {
                value: 6,
                message: "Минимальная длина пароля 6 символов",
              },
              maxLength: {
                value: 25,
                message: "Минимальная длина пароля 25 символов",
              },
            })}
          />
        </div>

        <p className="authError">
          {errorAuth ||
            (errors.email && errors.email.message) ||
            (errors.password && errors.password.message)}
        </p>

        <LoadingButton
          type="submit"
          isLoading={isSubmitting}
          text={tittle}
          disabled={isValid}
        />
      </form>
    </div>
  );
};

export { Form };
