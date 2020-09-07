import React, { useState, useEffect } from "react";
import LoginForm from "../../components/login/LoginForm";
import Axios from "axios";
import { registerCheck } from "../../middleware";
import { Helmet } from "react-helmet-async";

const Login = ({ history, location }) => {
  const initialState = {
    username: "",
    password: "",
  };
  const [login, setLogin] = useState(initialState);
  const [user, setUser] = useState(false);
  const { username, password } = login;

  const onSubmit = (e) => {
    e.preventDefault();
    setLogin({ ...login });
    const postLogin = async () => {
      try {
        await Axios.post("/auth/login", {
          username,
          password,
        });
        setUser(true);
      } catch (err) {
        const LOGIN = "login";
        registerCheck(err, LOGIN, { history });
      }
    };
    postLogin();
  };

  useEffect(() => {
    if (user) window.location.href = "/";
    return () => {
      setUser(false);
    };
  }, [user]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  return (
    <>
      <Helmet>
        <title>My Blog | Login</title>
      </Helmet>
      <LoginForm
        user={user}
        onSubmit={onSubmit}
        onChange={onChange}
      ></LoginForm>
    </>
  );
};

export default Login;
