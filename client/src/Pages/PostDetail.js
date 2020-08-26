import React, { useEffect, useState } from "react";
import PostDetailForm from "../components/PostDetailForm";
import Axios from "axios";

const PostDetail = () => {
  const [posting, setPosting] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const axiosGetData = async () => {
      try {
        const data = await Axios.get("/api/post").then((res) => res);
        setPosting(data);
      } catch (err) {
        console.log(err);
      }
    };
    axiosGetData();
    return () => {};
  }, [posting]);

  return (
    <>
      <PostDetailForm />
    </>
  );
};

export default PostDetail;
