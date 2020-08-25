import React from "react";
import { Route } from "react-router-dom";
import routes from "./routes";

// page
import Nav from "../src/components/Nav";
import Home from "./Pages/Home";
import Portfolio from "./Pages/Portfolio";
import About from "./Pages/About";
import Post from "./Pages/Post";
import Admin from "./Pages/Admin";
import Register from "./Pages/Register";

function App() {
  return (
    <>
      <Nav></Nav>
      <Route path={routes.home} exact={true} component={Home}></Route>
      <Route path={routes.portfolio} component={Portfolio}></Route>
      <Route path={routes.post} component={Post}></Route>
      <Route path={routes.about} component={About}></Route>
      <Route path={routes.admin} component={Admin}></Route>
      <Route path={routes.register} component={Register}></Route>
    </>
  );
}

export default App;
