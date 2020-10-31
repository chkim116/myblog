import React, { useState, useEffect } from "react";
import LoginForm from "../../components/login/LoginForm";
import Axios from "axios";
import { registerCheck } from "../../middleware";
import { Helmet } from "react-helmet-async";
import { Loading } from "../Etc/Loading";
import { getToken } from "../../Modules/auth";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useState(false);
  const { username, password } = login;

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setLogin({ ...login, [name]: value });
    },
    [login]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setUser(true);
      const postLogin = async () => {
        try {
          const token = await Axios.post("/auth/login", {
            username,
            password,
          }).then((res) => res.data.token);
          dispatch(getToken(token));
          history.push("/");
        } catch (err) {
          const LOGIN = "login";
          registerCheck(err, LOGIN, { history });
        }
        setUser(false);
      };
      postLogin();
    },
    [login]
  );

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
