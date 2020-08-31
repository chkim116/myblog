import React, { useState, useEffect } from "react";
import RegisterForm from "../../components/login/RegisterForm";
import Axios from "axios";
import { registerCheck } from "../../middleware";

const Register = ({ history, location }) => {
  const initialState = {
    username: "",
    password: "",
    password2: "",
    email: "",
  };
  const [register, setRegister] = useState(initialState);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const { username, password, password2, email } = register;

  const showMessage = (e) => {
    e.preventDefault();
    if (!message) {
      setMessage(true);
    }
  };

  const onSubmit = (e) => {
    if (password !== password2 || (username.length && password < 6)) {
      showMessage(e);
    } else {
      e.preventDefault();
      setRegister({ ...register });
      const adminRegister = async () => {
        await Axios.post("/auth/register", {
          username,
          password,
          email,
        }).catch((err) => {
          const ADMIN = "admin";
          registerCheck(err, ADMIN, { history });
        });
      };
      adminRegister();
      setLoading(true);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
    setMessage(false);
  };

  useEffect(() => {
    if (loading) {
      history.push("/");
    }
    return () => {
      setLoading(false);
    };
  });

  return (
    <RegisterForm
      message={message}
      onChange={onChange}
      onSubmit={onSubmit}
      history={history}
      location={location}
    ></RegisterForm>
  );
};

export default Register;
