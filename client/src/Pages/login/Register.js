import React, { useState, useEffect } from "react";
import RegisterForm from "../../components/login/RegisterForm";
import Axios from "axios";
import { registerCheck } from "../../customHooks";
import { Loading } from "../Etc/Loading";
import { SeoMeta } from "../../SeoMeta";

const Register = ({ history }) => {
  const [register, setRegister] = useState({
    username: "",
    password: "",
    password2: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const { username, password, password2, email } = register;

  const onSubmit = (e) => {
    setUser(true);
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
        setLoading(true);
      } catch (err) {
        console.log(err);
        const REGISTER = "register";
        registerCheck(err, REGISTER, { history });
      }
      setUser(false);
    };
    adminRegister();
  };

  useEffect(() => {
    if (loading) {
      window.location.href = "/";
    }
  }, [loading]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const data = {
    title: "회원가입 | Think_Thank",
    description: "내가 생각하는 창고, Think Tank",
    canonical: `register`,
  };

  return (
    <>
      <SeoMeta data={data} />
      {user && <Loading />}
      <RegisterForm onChange={onChange} onSubmit={onSubmit}></RegisterForm>
    </>
  );
};

export default Register;
