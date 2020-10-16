import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Helmet } from "react-helmet-async";

// scss
import "./Styles/loading.scss";
// page
import Nav from "./components/Layouts/Nav";
import { Loading } from "./Pages/Etc/Loading";
import { useUserId } from "./middleware";
import { RouteCompoents } from "./RouteCompoents";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "./Redux/auth";

function App() {
  // user 확인
  const getUser = useUserId("/auth");
  const { userId, loading } = getUser;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuth(userId));
  }, [userId]);

  const user = useSelector((state) => state.auth);

  console.log(user);

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
      <RouteCompoents />
    </>
  );
}

export default App;
