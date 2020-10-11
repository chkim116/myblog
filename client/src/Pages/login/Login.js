import React, { useState, useEffect } from "react";
import LoginForm from "../../components/Login/LoginForm";
import Axios from "axios";
import { registerCheck } from "../../middleware";
import { Helmet } from "react-helmet-async";
import { Loading } from "../Etc/Loading";

const Login = ({ history }) => {
  const initialState = {
    username: "",
    password: "",
  };
  const [login, setLogin] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const { username, password } = login;

  const onSubmit = (e) => {
    setLoading(true);
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
        setLoading(false);
      }
    };
    postLogin();
  };

  useEffect(() => {
    if (user) {
      window.location.href = "/";
      setLoading(false);
    }
  }, [user]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  return (
    <>
      <Helmet>
        <title>My Blog | 로그인</title>
      </Helmet>

      {loading && <Loading />}
      <LoginForm
        user={user}
        onSubmit={onSubmit}
        onChange={onChange}></LoginForm>
    </>
  );
};

export default Login;
