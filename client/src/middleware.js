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

// id, username hooks
export const useUserId = (url) => {
  const [userId, setUserId] = useState({
    id: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);

  const getUserId = async () => {
    try {
      await Axios.get(url).then((res) => setUserId(res.data));
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserId();
  }, []);

  return { userId, loading };
};

// get Post Hooks
export const useGetPost = (url) => {
  const [post, setpost] = useState({
    title: "",
    description: "",
    updated: "",
    creator: "",
  });
  const [loading, setLoading] = useState(false);

  const getPost = async () => {
    try {
      await Axios.get(url).then((res) => setpost(res.data));
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return { post, loading };
};
