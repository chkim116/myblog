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
    admin: false,
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
    // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, []);

  return { post, loading };
};

export const useGetPort = (url) => {
  const [guest, setGuest] = useState({
    title: "",
    description: "",
    createDate: "",
    creator: "",
    username: "",
    updata: false,
  });
  const [loading, setLoading] = useState(false);

  const getGuest = async () => {
    try {
      await Axios.get(url).then((res) => setGuest(res.data));
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGuest();
    // eslint-disable-next-line
  }, []);

  return { guest, loading };
};

// react-quill

export const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

export const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "align",
  "color",
  "background",
  "link",
  "image",
  "video",
];
