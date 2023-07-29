import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";

import { Form } from "./Form";

const SignUp = () => {
  const dispatch = useDispatch();
  const [errorAuth, setErrorAuth] = useState("");

  const onRegister = async (data, e) => {
    const auth = getAuth();

    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then(console.log);
    } catch (e) {
      console.log(`SignIn`, e.message);
    }
  };
  return (
    <Form tittle="Регистрация" onSubmit={onRegister} errorAuth={errorAuth} />
  );
};

export default SignUp;
