import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import PostDetailForm from "../../components/post/PostDetailForm";

const PostDetail = () => {
  const [post, setPosting] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const axiosGetData = async () => {
      try {
        const data = await Axios.get(`/${id}`).then((res) => res.data);
        setPosting(data);
      } catch (err) {
        console.log(err);
      }
      setLoading(true);
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
