import React, { useState, useCallback, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";

// page
import Nav from "../src/components/Nav";
import Home from "./Pages/Home";
import Portfolio from "./Pages/Portfolio";
import About from "./Pages/About";
import Post from "./Pages/Post";
import Admin from "./Pages/Admin";
import Register from "./Pages/Register";
import PostWriting from "./Pages/PostWriting";
import PostDetail from "./Pages/PostDetail";

function App() {
  const [width, setWidth] = useState(768);

  const handleWidth = useCallback(() => {
    const innerWidth = window.innerWidth;
    setWidth(innerWidth);
  }, []);

  const onChange = window.addEventListener("resize", handleWidth);

  return (
    <Fragment>
      <div onChange={onChange}>
        <Nav width={width}></Nav>
        <Switch>
          <Route path={routes.home} exact={true} component={Home}></Route>
          <Route path={routes.portfolio} component={Portfolio}></Route>
          <Route path={routes.post} component={Post}></Route>
          <Route path={routes.about} component={About}></Route>
          <Route path={routes.admin} component={Admin}></Route>
          <Route path={routes.register} component={Register}></Route>
          <Route path={routes.postwriting} component={PostWriting}></Route>
          <Route path={"/postdetail/:id"} component={PostDetail}></Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default App;
