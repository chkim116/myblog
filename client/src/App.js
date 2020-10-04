import React, { useState, useEffect, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";
import Axios from "axios";
import { Helmet } from "react-helmet-async";

// scss
import "./loading.scss";
// page
import Nav from "./components/Layouts/Nav";
import Home from "./Pages/main/Home";
import About from "./Pages/main/About";
import Post from "./Pages/main/Post";
import Portfolio from "./Pages/main/Portfolio";
import PostWriting from "./Pages/post/PostWriting";
import PostDetail from "./Pages/post/PostDetail";
import Register from "./Pages/login/Register";
import dotenv from "dotenv";
import NotFound from "./Pages/main/NotFound";
import Login from "./Pages/login/Login";
import PostEdit from "./Pages/post/PostEdit";
import { useUserId } from "./middleware";
import { PortWriting } from "./Pages/portfolio/PortWriting";
import { PortDetail } from "./Pages/portfolio/PortDetail";
import { PortEdit } from "./Pages/portfolio/PortEdit";
dotenv.config();

function App() {
  // 미디어 쿼리 조절
  const [width, setWidth] = useState(768);
  const handleWidth = useCallback(() => {
    const innerWidth = window.innerWidth;
    setWidth(innerWidth);
  }, []);

  useEffect(() => {
    handleWidth();
    // eslint-disable-next-line
  }, [width]);

  const onChange = window.addEventListener("resize", handleWidth);

  // user 확인
  const getUser = useUserId("/auth");
  const { userId, loading } = getUser;
  const { admin } = userId;

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
    return (
      <div className="loading__title">로딩중입니다. 잠시만 기다려주세요^^</div>
    );
  }
  return (
    <>
      <Helmet>
        <title>My Blog | Home</title>
      </Helmet>
      <Nav
        userId={userId}
        logout={logout}
        onClick={onClick}
        width={width}
        onChange={onChange}
        admin={admin}
      ></Nav>
      <Switch>
        <Route exact path={routes.home} component={Home}></Route>
        <Route path={routes.register} component={Register}></Route>
        <Route path={routes.login} component={Login}></Route>
        <Route path={routes.portfolio} component={Portfolio}></Route>
        <Route path={routes.post} component={Post}></Route>
        <Route path={routes.about} component={About}></Route>
        <Route path="/postdetail/:id" component={PostDetail}></Route>
        <Route path={"/edit/:id"} component={PostEdit} />
        {userId ? (
          <Route path={routes.postwriting} component={PostWriting}></Route>
        ) : (
          <Route path={routes.postwriting}>
            <h3 className="error__title">
              로그인을 하셔야 포스팅을 하실 수 있습니다.
            </h3>
          </Route>
        )}
        <Route path="/portdetail/:id" component={PortDetail} />
        {admin ? (
          <Route path="/portedit/:id" component={PortEdit} />
        ) : (
          <div className="error_title">관리자가 아닙니다.</div>
        )}

        {admin ? (
          <Route path={routes.portwriting} component={PortWriting} />
        ) : (
          <div className="error_title">관리자가 아닙니다. </div>
        )}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
