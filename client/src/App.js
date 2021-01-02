import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Styles/loading.scss";

// page
import Nav from "./components/Layouts/Nav";
import FooterForm from "./components/Layouts/FooterForm";
import { SearchingBtn } from "./components/Search/SearchingBtn";
import { RouteCompoents } from "./RouteCompoents";
import { Loading } from "./Pages/Etc/Loading";

// 유저 확인을 위한 hook&redux

import { Route, useLocation } from "react-router-dom";
import { ArrowUp } from "./components/Layouts/ArrowUp";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, getToken } from "./Modules/auth";
import routes from "./routes";

Axios.defaults.baseURL =
    process.env.NODE_ENV === "production"
        ? routes.api
        : "http://localhost:4000/";
Axios.defaults.withCredentials = true;

function App() {
    // view
    const [view, setView] = useState({});
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    useEffect(
        () => {
            if (token) {
                document.cookie = `x_auth=${token}; max-age=604800; path=/; sameSite=none; secure; httpOnly`;
            }
            const getUser = async () => {
                await Axios.get("/auth").then((res) =>
                    dispatch(getAuth(res.data))
                );
            };
            getUser();
        },
        // eslint-disable-next-line
        [token]
    );

    useEffect(() => {
        const getViews = async () => {
            await Axios.post("/view").then((res) => setView(res.data));
            setLoading(false);
        };
        getViews();
    }, []);

    // userLogout
    const [logout, setLogout] = useState(false);

    const onClick = () => {
        const userLogout = async () => {
            try {
                document.cookie = `x_auth=; max-age=0; path=/; sameSite=none; secure; httpOnly`;
                await Axios.post("/auth/logout");
                setLogout(true);
                dispatch(getAuth(""));
                dispatch(getToken({ id: "", token: "" }));
            } catch (err) {
                console.log(err);
            }
        };
        userLogout();
    };

    // scroll to top
    const onScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (loading) {
        return <Loading />;
    }

    //  slide

    return (
        <>
            <Nav logout={logout} onClick={onClick}></Nav>
            <Route component={SearchingBtn}></Route>
            <ArrowUp onClick={onScrollTop} />
            <RouteCompoents />
            {location.pathname === "/login" ||
                location.pathname === "/register" || <FooterForm view={view} />}
        </>
    );
}

export default App;
