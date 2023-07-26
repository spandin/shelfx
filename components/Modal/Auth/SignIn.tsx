// import { UserAuth } from "@/context/AuthContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";

import { Form } from "./Form";

const SignIn = () => {
  // const { signIn } = UserAuth();
  const dispatch = useDispatch();
  const [errorAuth, setErrorAuth] = useState("");

  const onLogin = async (data: any, e: any) => {
    const auth = getAuth();

    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password).then(
        ({ user }) => {
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: user.accessToken,
            })
          );
        }
      );
    } catch (e: any) {
      console.log(`SignIn`, e.message);
    }

    // try {
    //   await signIn(data.email, data.password);
    // } catch (e: any) {
    //   console.log(`SignIn`, e.message);
    //   e.message === "Firebase: Error (auth/user-not-found)."
    //     ? setErrorAuth("Пользователь не найдет")
    //     : e.message === "Firebase: Error (auth/wrong-password)."
    //     ? setErrorAuth("Не верный пароль")
    //     : e.message === "Firebase: Error (auth/invalid-email)."
    //     ? setErrorAuth("Email должен иметь `@` и доменное имя")
    //     : e.message === "Firebase: Error (auth/internal-error)."
    //     ? setErrorAuth("Введите пароль")
    //     : e.message ===
    //       `Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).`
    //     ? setErrorAuth("Авторизация заблокирована, попробуйте позже :)")
    //     : e.message === "Firebase: Error (auth/operation-not-allowed)."
    //     ? setErrorAuth("Авторизация отключена администрацией")
    //     : setErrorAuth("Проверьте подключение к сети");
    // }
  };
  return <Form tittle="Войти" onSubmit={onLogin} errorAuth={errorAuth} />;
};

export default SignIn;
