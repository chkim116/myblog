import React, { useEffect, useState } from "react";
import PostDetailForm from "../components/PostDetailForm";
import Axios from "axios";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const [post, setPosting] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    const axiosGetData = async () => {
      try {
        const data = await Axios.get(`/${id}`).then((res) => res.data);
        setLoading(true);
        setPosting(data);
      } catch (err) {
        console.log(err);
      }
    };
    axiosGetData();
  }, []);

  if (!loading) {
    return <h1>NOT!!</h1>;
  }

  return (
    <>
      <PostDetailForm postObj={post} />
    </>
  );
};

export default PostDetail;
