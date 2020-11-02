import React, { useState, useEffect } from "react";
import LoginForm from "../../components/login/LoginForm";
import Axios from "axios";
import { registerCheck } from "../../customHooks";
import { Loading } from "../Etc/Loading";
import { getToken } from "../../Modules/auth";
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import { useCallback } from "react";
=======
import { SeoMeta } from "../../SeoMeta";
>>>>>>> 61bc4913be17f9f89f8af44729596b36bd99ffea

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

  const data = {
    title: "로그인 | Think_Thank",
    description: "내가 생각하는 창고, Think Tank",
    canonical: `login`,
  };

  return (
    <>
      <SeoMeta data={data} />

      {user && <Loading />}
      <LoginForm
        user={user}
        onSubmit={onSubmit}
        onChange={onChange}></LoginForm>
    </>
  );
};

export default Login;
