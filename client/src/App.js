import React, { useState, useCallback, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";

// page
import Nav from "./components/Nav";
import Home from "./Pages/main/Home";
import About from "./Pages/main/About";
import Post from "./Pages/main/Post";
import Portfolio from "./Pages/main/Portfolio";
import PostWriting from "./Pages/post/PostWriting";
import PostDetail from "./Pages/post/PostDetail";

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
        <Route path={routes.home} exact={true} component={Home}></Route>
        <Switch>
          <Route path={routes.portfolio} component={Portfolio}></Route>
          <Route path={routes.post} component={Post}></Route>
          <Route path={routes.about} component={About}></Route>
          <Route path={routes.postwriting} component={PostWriting}></Route>
          <Route path="/postdetail/:id" component={PostDetail}></Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default App;
