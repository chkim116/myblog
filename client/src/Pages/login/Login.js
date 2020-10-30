import React, { useState, useEffect } from "react";
import LoginForm from "../../components/login/LoginForm";
import Axios from "axios";
import { registerCheck } from "../../middleware";
import { Helmet } from "react-helmet-async";
import { Loading } from "../Etc/Loading";
import { getToken } from "../../Modules/auth";
import { useDispatch } from "react-redux";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const { username, password } = login;

  const onSubmit = (e) => {
    setUser(true);
    e.preventDefault();
    setLogin({ ...login });
    const postLogin = async () => {
      try {
        const token = await Axios.post("/auth/login", {
          username,
          password,
        }).then((res) => res.data.token);
        dispatch(getToken(token));
        setLoading(true);
      } catch (err) {
        const LOGIN = "login";
        registerCheck(err, LOGIN, { history });
      }
      setUser(false);
    };
    postLogin();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  useEffect(
    () => {
      if (loading) {
        history.push("/");
      }
    },
    // eslint-disable-next-line
    [loading]
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
