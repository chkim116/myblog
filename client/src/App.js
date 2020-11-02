import React, { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import { Helmet } from "react-helmet-async";
import "./Styles/loading.scss";

// page
import Nav from "./components/Layouts/Nav";
import FooterForm from "./components/Layouts/FooterForm";
import { SearchingBtn } from "./components/Search/SearchingBtn";
import { RouteCompoents } from "./RouteCompoents";
import { Loading } from "./Pages/Etc/Loading";

import { Route } from "react-router-dom";
import { ArrowUp } from "./components/Layouts/ArrowUp";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, getToken } from "./Modules/auth";
import routes from "./routes";

function App() {
  const token = useSelector((state) => state.auth.token);

  Axios.defaults.baseURL = routes.api;
  Axios.defaults.withCredentials = true;

  // view
  const [view, setView] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(
    () => {
      if (token === "") {
        return console.log("empty token");
      }
      const getUser = async () => {
        setLoading(true);
        try {
          await Axios.get("/auth").then((res) => dispatch(getAuth(res.data)));
        } catch (err) {
          console.log(err);
        }
        setLoading(false);
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

  const onClick = useCallback(() => {
    const userLogout = async () => {
      try {
        await Axios.post("/auth/logout");
        setLogout(true);
        dispatch(getAuth(""));
        dispatch(getToken(""));
      } catch (err) {
        console.log(err);
      }
    };
    userLogout();
  }, [logout]);

  // scroll to top
  const onScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [window.scrollTo]);

  if (loading) {
    return <Loading />;
  }

  //  slide

  return (
    <>
      <Helmet>
        <title>My Blog | Home</title>
      </Helmet>
      <Nav logout={logout} onClick={onClick}></Nav>
      <Route component={SearchingBtn}></Route>
      <ArrowUp onClick={onScrollTop} />
      <RouteCompoents />
      <FooterForm view={view} />
    </>
  );
}

export default App;
