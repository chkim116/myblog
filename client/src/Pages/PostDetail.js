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
        const data = await Axios.get("/api").then((res) => res.data);
        setPosting(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    axiosGetData();
  }, []);

  const { post } = posting;

  return (
    <>
      <PostDetailForm post={post} />
    </>
  );
};

export default PostDetail;
