import { UserAuth } from "@/context/AuthContext";
import { useState } from "react";

import { Form } from "./Form";

const SignIn = () => {
  const { signIn } = UserAuth();
  const [errorAuth, setErrorAuth] = useState("");

  const onLogin = async (data: any, e: any) => {
    e.preventDefault();
    try {
      await signIn(data.email, data.password);
    } catch (e: any) {
      console.log(`SignIn`, e.message);
      e.message === "Firebase: Error (auth/user-not-found)."
        ? setErrorAuth("Пользователь не найдет")
        : e.message === "Firebase: Error (auth/wrong-password)."
        ? setErrorAuth("Не верный пароль")
        : e.message === "Firebase: Error (auth/invalid-email)."
        ? setErrorAuth("Email должен иметь `@` и доменное имя")
        : e.message === "Firebase: Error (auth/internal-error)."
        ? setErrorAuth("Введите пароль")
        : e.message ===
          `Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).`
        ? setErrorAuth("Авторизация заблокирована, попробуйте позже :)")
        : e.message === "Firebase: Error (auth/operation-not-allowed)."
        ? setErrorAuth("Авторизация отключена администрацией")
        : setErrorAuth("Проверьте подключение к сети");
    }
  };
  return <Form tittle="Войти" onSubmit={onLogin} errorAuth={errorAuth} />;
};

export default SignIn;
