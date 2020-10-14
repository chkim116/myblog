import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Helmet } from "react-helmet-async";
import PostForm from "../../components/Posting/PostForm";
import { Loading } from "../Etc/Loading";
import { useGetPost, useUserId } from "../../middleware";

const Post = ({ location, history }) => {
  // 관리자 확인
  const userId = useUserId("/auth");
  const {
    userId: { admin },
  } = userId;

  // get all post / 5, 페이지의 수를 파악하기 위해 불러옴
  const [postLength, setPostLenght] = useState();

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
    getAllPost();
  }, []);

  // url에 따른 포스트 호출
  const [page, setPage] = useState({ query: location.search });
  const { query } = page;

  // 눌렀던 번호를 쿼리에 맞춰 설정
  const [select, setSelect] = useState({ selecting: 0 });
  const { selecting } = select;

  // query url에 따른 보여주는 포스트

  const { post, loading } = useGetPost(query ? `/api${query}` : "/api");

  const handleChange = (e) => {
    const { selected } = e;
    setPage({ query: `?page=${selected + 1}` });
    history.push(`/post?page=${selected + 1}`);
  };

  useEffect(() => {
    setSelect({ selecting: query ? parseInt(query.split("=")[1] - 1) : 0 });
  }, [query]);

  // 게시글 삭제

  // del
  const [del, setDel] = useState(false);

  const onClick = (e) => {
    const boardId = e.target.dataset.id;
    const deletePost = async () => {
      setDel(true);
      try {
        await Axios.get(`/api/del/${boardId}`);
        window.location.reload();
      } catch (err) {
        console.log(err);
        alert("삭제에 실패했습니다.");
      }
      setDel(false);
    };
    deletePost();
  };

  return (
    <>
      <Helmet>
        <title>My Blog | 포스트</title>
      </Helmet>
      {del && <Loading />}
      {loading ? (
        <PostForm
          onClick={onClick}
          post={post}
          loading={loading}
          admin={admin}
          postLength={postLength}
          page={page}
          handleChange={handleChange}
          select={selecting}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Post;
