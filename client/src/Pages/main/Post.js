import React, { useState, useEffect } from "react";
import FooterForm from "../../components/FooterForm";
import PostForm from "../../components/main/PostForm";
import Axios from "axios";
import { Helmet } from "react-helmet-async";

const Post = ({ location, history }) => {
  // url에 따른 포스트 호출
  const [page, setPage] = useState({ query: location.search });
  const { query } = page;

  // 눌렀던 번호를 쿼리에 맞춰 설정
  const [select, setSelect] = useState({ selecting: 0 });
  const { selecting } = select;
  // query url에 따른 보여주는 포스트
  const [post, setPost] = useState({
    title: "",
    description: "",
    updated: "",
    creator: "",
  });

  // 등록된 포스트의 총 길이 ( limit 5 )
  const [postLength, setPostLenght] = useState();
  const [loading, setLoading] = useState(false);

  // get post query 부분만
  const getPost = (query) => {
    setLoading(false);
    const pagePost = async () => {
      try {
        const getPagePost = await Axios.get(
          query ? `/api${query}` : "/api"
        ).then((res) => res.data);
        setPost(getPagePost);
        setLoading(true);
        document.getElementById("root").scrollIntoView({ behavior: "smooth" });
      } catch (err) {
        console.log(err);
      }
    };
    pagePost();
  };

  // get all post / 5, 페이지의 수를 파악하기 위해 불러옴
  const getAllPost = () => {
    const AllPost = async () => {
      try {
        const posting = await Axios.get("/api/all").then((res) => res.data);
        setPostLenght(Math.ceil(posting.length / 3));
      } catch (err) {
        console.log(err);
      }
    };
    AllPost();
  };

  useEffect(() => {
    getPost(query);
    setSelect({ selecting: query ? parseInt(query.split("=")[1] - 1) : 0 });
  }, [query]);

  useEffect(() => {
    getAllPost();
  }, []);

  const handleChange = (e) => {
    const { selected } = e;
    setPage({ query: `?page=${selected + 1}` });
    history.push(`/post?page=${selected + 1}`);
  };

  return (
    <>
      <Helmet>
        <title>My Blog | Post</title>
      </Helmet>
      <PostForm
        postObj={{ post }}
        loading={loading}
        postLength={postLength}
        page={page}
        handleChange={handleChange}
        select={selecting}
      />
      <FooterForm />
    </>
  );
};

export default Post;
