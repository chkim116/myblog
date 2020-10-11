import React, { useState, useEffect } from "react";
import RegisterForm from "../../components/Login/RegisterForm";
import Axios from "axios";
import { registerCheck } from "../../middleware";
import { Helmet } from "react-helmet-async";
import { Loading } from "../Etc/Loading";

const Register = ({ history }) => {
  const initialState = {
    username: "",
    password: "",
    password2: "",
    email: "",
  };

  const [register, setRegister] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const { username, password, password2, email } = register;

  const onSubmit = (e) => {
    setLoading(true);
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
      } catch (err) {
        console.log(err);
        const REGISTER = "register";
        registerCheck(err, REGISTER, { history });
        setLoading(false);
      }
    };
    adminRegister();
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
      window.location.href = "/";
    }

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
        <title>My Blog | 회원가입</title>
      </Helmet>

      {loading && <Loading />}
      <RegisterForm onChange={onChange} onSubmit={onSubmit}></RegisterForm>
    </>
  );
};

export default Register;
