import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";

import Home from "./Pages/Homes/Home";
import About from "./Pages/About/About";
import Post from "./Pages/Posting/Post";
import GuestBook from "./Pages/GuestBooks/GuestBook";
import PostWriting from "./Pages/Posting/PostWriting";
import PostDetail from "./Pages/Posting/PostDetail";
import Register from "./Pages/login/Register";
import NotFound from "./Pages/Etc/NotFound";
import Login from "./Pages/login/Login";
import PostEdit from "./Pages/Posting/PostEdit";
import { GuestBookWriting } from "./Pages/GuestBooks/GuestBookWriting";
import { GuestBookDetail } from "./Pages/GuestBooks/GuestBookDetail";
import { GuestBookEdit } from "./Pages/GuestBooks/GuestBookEdit";
import { Searching } from "./Pages/Search/Searching";
import { useSelector } from "react-redux";
import { SearchingBtn } from "./components/Search/SearchingBtn";

export const RouteCompoents = () => {
  const auth = useSelector((state) => state.auth);
  const { id, admin } = auth;
  return (
    <Switch>
      <Route exact path={routes.home} component={Home} />
      <Route path={routes.register} component={Register} />
      <Route path={routes.login} component={Login} />
      <Route path={routes.guestbook} component={GuestBook} />
      <Route path={routes.post} component={Post} />
      <Route path={routes.about} component={About} />
      <Route path={routes.search} component={Searching} />
      {admin ? (
        <Route path={routes.postwriting} component={PostWriting} />
      ) : (
        <Route path={routes.postwriting}>
          <h3 className='error__title'>관리자가 아닙니다.</h3>
        </Route>
      )}

      <Route path='/postdetail/:id' component={PostDetail} />
      {admin ? (
        <Route path={"/edit/:id"} component={PostEdit} />
      ) : (
        <Route path={"/edit/:id"}>
          <h3 className='error__title'>관리자가 아닙니다.</h3>
        </Route>
      )}
      <Route path='/guestbookdetail/:id' component={GuestBookDetail} />
      <Route path='/guestbookedit/:id' component={GuestBookEdit} />
      {id ? (
        <Route path={routes.guestbooking} component={GuestBookWriting} />
      ) : (
        <Login />
      )}

      <Route component={NotFound} />
    </Switch>
  );
};
