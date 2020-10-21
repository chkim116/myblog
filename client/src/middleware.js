import { useState, useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryList, filterCategory } from "./Modules/category";

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

export const useGetPost = (url, location) => {
  const dispatch = useDispatch();
  let filter = useSelector((state) => state.category.filter);

  const [loading, setLoading] = useState(false);

  const getPost = async () => {
    setLoading(false);
    try {
      await Axios.get(url).then((res) =>
        dispatch(filterCategory(filter, res.data))
      );
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (location) {
      if (location.search.indexOf("filter") > -1) {
        filter = decodeURI(location.search.split("&")[1].split("=")[1]);
      }
    }
    getPost();
    // eslint-disable-next-line
  }, [url || filter]);

  return { loading };
};

// get GuestBook

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

// get Tags

export const useGetTag = (url) => {
  const [searchTags, setSearchTags] = useState({
    title: "",
    description: "",
    createDate: "",
    creator: "",
    username: "",
    updata: false,
    tags: [],
    comment: [],
  });
  const [loading, setLoading] = useState(false);

  const getSearchTags = async () => {
    try {
      await Axios.get(url).then((res) => setSearchTags(res.data));
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSearchTags();
  }, [url]);

  return { searchTags, loading };
};

// searching post

export const useSearch = (search) => {
  const [searchPost, setSearchPost] = useState({
    title: "",
    description: "",
    createDate: "",
    creator: "",
    username: "",
    updata: false,
    tags: [],
    comment: [],
  });

  const getSearchPost = async (search) => {
    try {
      const searchPost = await Axios({
        method: "GET",
        url: "/api/searching",
        params: { q: search },
      }).then((res) => res.data);
      setSearchPost(searchPost);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSearchPost(search);
  }, [search]);

  return searchPost;
};

// get category

export const useGetCategory = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getCategory = async () => {
    setLoading(true);
    await Axios.get("/category").then((res) =>
      dispatch(createCategoryList(res.data))
    );
    setLoading(false);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return { loading };
};

// react-quill
export const modules = {
  toolbar: {
    container: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["link", "image", "video"],
    ],
  },
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
