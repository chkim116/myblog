import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Helmet } from "react-helmet-async";
import "./Styles/loading.scss";

// page
import Nav from "./components/Layouts/Nav";
import { SearchingBtn } from "./components/Search/SearchingBtn";
import { RouteCompoents } from "./RouteCompoents";
import { Loading } from "./Pages/Etc/Loading";

// 유저 확인을 위한 hook&redux
import { useUserId } from "./middleware";
import { useDispatch } from "react-redux";
import { getAuth } from "./Modules/auth";
import { Route } from "react-router-dom";

function App() {
  // user 체크
  const getUser = useUserId("/auth");
  const { userId, loading } = getUser;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuth(userId));
  }, [userId]);

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

  if (logout) {
    return (window.location.href = "/");
  }
  if (!loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>My Blog | Home</title>
      </Helmet>
      <Nav logout={logout} onClick={onClick}></Nav>
      <Route component={SearchingBtn}></Route>
      <RouteCompoents />
    </>
  );
}

export default App;
