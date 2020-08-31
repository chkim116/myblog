import React, { useState } from "react";
import AdminLoginForm from "../../components/login/AdminLoginForm";
import Axios from "axios";
import { registerCheck } from "../../middleware";

const Admin = ({ history }) => {
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
        await Axios.post("/api/login", {
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

  if (user) {
    alert("get");
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  console.log(login);

  return (
    <AdminLoginForm onSubmit={onSubmit} onChange={onChange}></AdminLoginForm>
  );
};

export default Admin;
