import React from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>My Blog | Not Found</title>
      </Helmet>
      <h3 className="error__title">Not Found!</h3>
    </>
  );
};

export default NotFound;
