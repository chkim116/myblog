import React, { useState, useEffect } from "react";
import LoginForm from "../../components/login/LoginForm";
import Axios from "axios";
import { registerCheck } from "../../hook/customHooks";
import { Loading } from "../Etc/Loading";
import { getToken } from "../../Modules/auth";
import { useDispatch } from "react-redux";
import { SeoMeta } from "../../SeoMeta";

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
                await Axios.post("/auth/login", {
                    username,
                    password,
                }).then((res) => dispatch(getToken(true)));
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
