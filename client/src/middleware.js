import { useState, useEffect } from "react";
import Axios from "axios";

export function registerCheck(err, url, { history }) {
  const {
    data: { message },
  } = err.response;
  if (message !== undefined) {
    history.push(`/${url}`);
    alert(`${message}`);
  }
}

export const useUserId = () => {
  const [userId, setUserId] = useState({
    id: "",
    username: "",
  });

  const getUserId = async () => {
    try {
      await Axios.get("/auth/id").then((res) => setUserId(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserId();
  }, []);

  return { userId };
};
