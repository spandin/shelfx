import { useState } from "react";
import { useDispatch } from "react-redux";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "@/store/slices/userSlice";

import { Form } from "./Form";

const SignIn = ({ tittle }) => {
  const dispatch = useDispatch();
  const [errorAuth, setErrorAuth] = useState("");

  const onLogin = async (data, e) => {
    const auth = getAuth();

    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password).then(
        ({ user }) => {
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: user?.accessToken,
            })
          );
        }
      );
    } catch (e) {
      console.log(`SignIn`, e.message);
    }
  };
  return <Form tittle="Войти" onSubmit={onLogin} errorAuth={errorAuth} />;
};

export default SignIn;
