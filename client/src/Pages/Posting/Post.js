import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Helmet } from "react-helmet-async";
import PostForm from "../../components/Posting/PostForm";
import { Loading } from "../Etc/Loading";
import { useUserId } from "../../middleware";

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
    createDate: "",
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
        setPostLenght(Math.ceil(posting.length / 6));
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

  // 게시글 삭제

  // del
  const [del, setDel] = useState(false);

  const onClick = (e) => {
    const boardId = e.target.dataset.id;
    console.log(boardId);
    const deletePost = async () => {
      setDel(true);
      try {
        await Axios.get(`/api/del/${boardId}`);
        window.location.reload();
      } catch (err) {
        console.log(err);
        setDel(false);
        alert("삭제에 실패했습니다.");
      }
    };
    deletePost();
  };

  // 관리자 확인
  const userId = useUserId("/auth");
  const {
    userId: { admin },
  } = userId;

  return (
    <>
      <Helmet>
        <title>My Blog | 포스트</title>
      </Helmet>
      {del && <Loading />}
      <PostForm
        onClick={onClick}
        postObj={{ post }}
        loading={loading}
        admin={admin}
        postLength={postLength}
        page={page}
        handleChange={handleChange}
        select={selecting}
      />
    </>
  );
};

export default Post;
