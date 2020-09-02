import React, { useState, useCallback, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";
import Axios from "axios";

// scss
import "./loading.scss";

// page
import Nav from "./components/Nav";
import Home from "./Pages/main/Home";
import About from "./Pages/main/About";
import Post from "./Pages/main/Post";
import Portfolio from "./Pages/main/Portfolio";
import PostWriting from "./Pages/post/PostWriting";
import PostDetail from "./Pages/post/PostDetail";
import Register from "./Pages/login/Register";
import dotenv from "dotenv";
import NotFound from "./Pages/main/NotFound";
import Admin from "./Pages/login/Admin";
import PostEdit from "./Pages/post/PostEdit";
dotenv.config();

function App() {
  // 모바일 resize 이벤트

  const [width, setWidth] = useState(768);
  const handleWidth = useCallback(() => {
    const innerWidth = window.innerWidth;
    setWidth(innerWidth);
  }, []);

  const onChange = window.addEventListener("resize", handleWidth);

  // user 확인
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const axiosUser = async () => {
    try {
      await Axios.get("/auth").then((res) => {
        setUser(res.data);
      });
    } catch (err) {
      setUser(false);
    }
    setLoading(true);
  };

  // 유저 확인 이벤트 (true면 유저임)
  const userLogged = async () => {
    try {
      await Axios.post("/auth/logout").then((res) => setUser(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axiosUser();
  }, [user]);

  const onClick = () => {
    userLogged();
  };

  return (
    <>
      {loading ? (
        <>
          <Nav
            width={width}
            user={user}
            onChange={onChange}
            onClick={onClick}
          ></Nav>
          <Switch>
            <Route exact path={routes.home} component={Home}></Route>
            <Route path={routes.admin} component={Register}></Route>
            <Route path={routes.login} component={Admin}></Route>
            <Route path={routes.portfolio} component={Portfolio}></Route>
            <Route path={routes.post} component={Post}></Route>
            <Route path={routes.about} component={About}></Route>
            {user ? (
              <Route path={routes.postwriting} component={PostWriting}></Route>
            ) : (
              <>
                <h3 className="error__title">
                  로그인을 하셔야 포스팅을 하실 수 있습니다.
                </h3>
              </>
            )}
            <Route path="/postdetail/:id" component={PostDetail}></Route>
            <Route path={"/edit/:id"} component={PostEdit} />
            <Route component={NotFound} />
          </Switch>
        </>
      ) : (
        <div className="loading__title">
          로딩중입니다. 잠시만 기다려주세요^^
        </div>
      )}
    </>
  );
}

export default App;
