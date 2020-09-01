import React, { useState, useEffect } from "react";
import RegisterForm from "../../components/login/RegisterForm";
import Axios from "axios";
import { registerCheck } from "../../middleware";

const Register = ({ history }) => {
  const initialState = {
    username: "",
    password: "",
    password2: "",
    email: "",
  };

  const [register, setRegister] = useState(initialState);
  const [message, setMessage] = useState(false);
  const [user, setUser] = useState(false);
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
        try {
          await Axios.post("/auth/register", {
            username,
            password,
            email,
          }).then((res) => setUser(res.data));
          console.log(user);
        } catch (err) {
          const ADMIN = "admin";
          registerCheck(err, ADMIN, { history });
        }
      };
      adminRegister();
    }
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
    setMessage(false);
  };

  return (
    <RegisterForm
      message={message}
      onChange={onChange}
      onSubmit={onSubmit}
    ></RegisterForm>
  );
};

export default Register;
