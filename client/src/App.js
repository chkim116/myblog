import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";
import Axios from "axios";
import { Helmet } from "react-helmet-async";

// scss
import "./Styles/loading.scss";
// page
import Nav from "./components/Layouts/Nav";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Post from "./Pages/Posting/Post";
import GuestBook from "./Pages/GuestBooks/GuestBook";
import PostWriting from "./Pages/Posting/PostWriting";
import PostDetail from "./Pages/Posting/PostDetail";
import Register from "./Pages/Login/Register";
import dotenv from "dotenv";
import NotFound from "./Pages/Etc/NotFound";
import Login from "./Pages/Login/Login";
import PostEdit from "./Pages/Posting/PostEdit";
import { useUserId } from "./middleware";
import { GuestBookWriting } from "./Pages/GuestBooks/GuestBookWriting";
import { GuestBookDetail } from "./Pages/GuestBooks/GuestBookDetail";
import { GuestBookEdit } from "./Pages/GuestBooks/GuestBookEdit";
import { Loading } from "./Pages/Etc/Loading";
dotenv.config();

function App() {
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
    return <Loading />;
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
        admin={admin}></Nav>
      <Switch>
        <Route exact path={routes.home} component={Home}></Route>
        <Route path={routes.register} component={Register}></Route>
        <Route path={routes.login} component={Login}></Route>
        <Route path={routes.guestbook} component={GuestBook}></Route>
        <Route path={routes.post} component={Post}></Route>
        <Route path={routes.about} component={About}></Route>
        {admin ? (
          <Route path={routes.postwriting} component={PostWriting}></Route>
        ) : (
          <Route path={routes.postwriting}>
            <h3 className='error__title'>관리자가 아닙니다.</h3>
          </Route>
        )}

        <Route path='/postdetail/:id' component={PostDetail}></Route>
        {admin ? (
          <Route path={"/edit/:id"} component={PostEdit} />
        ) : (
          <Route path={"/edit/:id"}>
            <h3 className='error__title'>관리자가 아닙니다.</h3>
          </Route>
        )}
        <Route path='/guestbookdetail/:id' component={GuestBookDetail} />
        <Route path='/guestbookedit/:id' component={GuestBookEdit} />
        {userId.id ? (
          <Route path={routes.guestbooking} component={GuestBookWriting} />
        ) : (
          <Login />
        )}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
