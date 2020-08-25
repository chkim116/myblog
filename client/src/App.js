import React from "react";
import { Route } from "react-router-dom";
import Home from "./Pages/Home";
import Portfolio from "./Pages/Portfolio";
import About from "./Pages/About";
import Post from "./Pages/Post";
import routes from "./routes";
import Nav from "../src/components/Nav";

function App() {
  return (
    <>
      <Nav></Nav>
      <Route path={routes.home} exact={true} component={Home}></Route>
      <Route path={routes.portfolio} component={Portfolio}></Route>
      <Route path={routes.post} component={Post}></Route>
      <Route path={routes.about} component={About}></Route>
    </>
  );
}

export default App;
