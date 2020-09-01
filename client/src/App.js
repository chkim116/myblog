import React, { useState, useCallback, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";
import Axios from "axios";
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
dotenv.config();

function App() {
  const [width, setWidth] = useState(768);

  const handleWidth = useCallback(() => {
    const innerWidth = window.innerWidth;
    setWidth(innerWidth);
  }, []);

  const onChange = window.addEventListener("resize", handleWidth);

  const [user, setUser] = useState(false);

  const axiosUser = async () => {
    await Axios.get("/auth").then((res) => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    axiosUser();
  }, []);

  const onClick = () => {
    const userLogged = async () => {
      await Axios.post("/auth/logout").then((res) => setUser(res.data));
    };
    userLogged();
    console.log(user);
  };

  return (
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
        <Route path={routes.postwriting} component={PostWriting}></Route>
        <Route path="/postdetail/:id" component={PostDetail}></Route>
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
