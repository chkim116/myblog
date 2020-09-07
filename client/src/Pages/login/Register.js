import React, { useState, useEffect } from "react";
import RegisterForm from "../../components/login/RegisterForm";
import Axios from "axios";
import { registerCheck } from "../../middleware";
import { Helmet } from "react-helmet-async";

const Register = ({ history }) => {
  const initialState = {
    username: "",
    password: "",
    password2: "",
    email: "",
  };

  const [register, setRegister] = useState(initialState);
  const [user, setUser] = useState(false);
  const { username, password, password2, email } = register;

  const onSubmit = (e) => {
    e.preventDefault();
    setRegister({ ...register });
    const adminRegister = async () => {
      try {
        await Axios.post("/auth/register", {
          username,
          password,
          password2,
          email,
        }).then((res) => setUser(res.data));
        console.log(user);
      } catch (err) {
        console.log(err);
        const REGISTER = "register";
        registerCheck(err, REGISTER, { history });
      }
    };
    adminRegister();
  };

  useEffect(() => {
    if (user) window.location.href = "/";
    return () => {
      setUser(false);
    };
  }, [user]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  return (
    <>
      <Helmet>
        <title>My Blog | Register</title>
      </Helmet>
      <RegisterForm onChange={onChange} onSubmit={onSubmit}></RegisterForm>
    </>
  );
};

export default Register;
