import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Helmet } from "react-helmet-async";
import "./Styles/loading.scss";

// page
import Nav from "./components/Layouts/Nav";
import FooterForm from "./components/Layouts/FooterForm";
import { SearchingBtn } from "./components/Search/SearchingBtn";
import { RouteCompoents } from "./RouteCompoents";
import { Loading } from "./Pages/Etc/Loading";

// 유저 확인을 위한 hook&redux

import { Route } from "react-router-dom";
import { ArrowUp } from "./components/Layouts/ArrowUp";
import routes from "./routes";

function App() {
  // Axios.defaults.baseURL = routes.api;
  Axios.defaults.withCredentials = true;
  // view
  const [view, setView] = useState({});
  const [loading, setLoading] = useState(false);

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
        await Axios.post("/auth/logout");
        setLogout(true);
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

  if (logout) {
    return (window.location.href = "/");
  }
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
