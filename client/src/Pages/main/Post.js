import React, { useState, useEffect } from "react";
import FooterForm from "../../components/FooterForm";
import PostForm from "../../components/main/PostForm";
import Axios from "axios";

const Post = ({ location, history }) => {
  // 포스트의 총 개수
  // url에 따른 포스트 호출 (인자는 이게 필요하다.)
  const [page, setPage] = useState({ query: location.search });

  const { query } = page;

  const [post, setPost] = useState({
    title: "",
    description: "",
    updated: "",
    creator: "",
  });
  const [postLength, setPostLenght] = useState();
  const [loading, setLoading] = useState(false);

  const getPost = (url) => {
    const pagePost = async () => {
      try {
        const getPagePost = await Axios.get(`/api${url}`).then(
          (res) => res.data
        );
        setPost(getPagePost);
        setLoading(true);
        document.getElementById("root").scrollIntoView({ behavior: "smooth" });
      } catch (err) {
        console.log(err);
      }
    };
    pagePost();
  };

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
  }, [query]);

  useEffect(() => {
    getAllPost();
  }, []);

  const handleChange = (e) => {
    const { selected } = e;
    setPage({ query: `?page=${selected + 1}` });
    history.push(`/post?page=${selected + 1}`);
    console.log(`누른 버튼은 ${selected + 1}`);
  };

  console.log(
    `page : ${page.query}`,
    `post : ${post.length}`,
    `페이지 넘버 ${postLength}`
  );

  return (
    <>
      <PostForm
        postObj={{ post }}
        loading={loading}
        postLength={postLength}
        page={page}
        handleChange={handleChange}
      />
      <FooterForm />
    </>
  );
};

export default Post;
