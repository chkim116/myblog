import Axios from "axios";
import { useState, useEffect } from "react";

export function registerCheck(err, url, { history }) {
  const {
    data: { message },
  } = err.response;
  if (message !== undefined) {
    history.push(`/${url}`);
    alert(`${message}`);
  }
}
