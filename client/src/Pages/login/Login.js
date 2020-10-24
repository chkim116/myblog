import React, { useState, useEffect } from "react";
import LoginForm from "../../components/login/LoginForm";
import Axios from "axios";
import { registerCheck } from "../../middleware";
import { Helmet } from "react-helmet-async";
import { Loading } from "../Etc/Loading";
import routes from "../../routes";

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
    setUser(true);
    e.preventDefault();
    setLogin({ ...login });
    const postLogin = async () => {
      try {
        await Axios.post(`${routes.api}/auth/login`, {
          username,
          password,
        });
        setLoading(true);
      } catch (err) {
        const LOGIN = "login";
        registerCheck(err, LOGIN, { history });
      }
      setUser(false);
    };
    postLogin();
  };

  useEffect(() => {
    if (loading) {
      window.location.href = "/";
    }
  }, [loading]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  return (
    <>
      <Helmet>
        <title>My Blog | 로그인</title>
      </Helmet>

      {user && <Loading />}
      <LoginForm
        user={user}
        onSubmit={onSubmit}
        onChange={onChange}></LoginForm>
    </>
  );
};

export default Login;
