import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetPort } from "../../middleware";
import { PostDetailForm } from "../../components/port/PostDetailForm";
import Axios from "axios";

export const PortDetail = ({ history }) => {
  const { id } = useParams();
  const ports = useGetPort(`/port/${id}`);
  const { port, loading } = ports;

  const [del, setDel] = useState(false);
  const onClick = () => {
    const deletePost = async () => {
      await Axios.get(`/port/del/${id}`).then((res) => setDel(res.data));
    };
    deletePost();
  };

  useEffect(() => {
    if (del) {
      history.push("/portfolio");
    }
    return () => {
      setDel(false);
    };
  });

  return (
    <>
      {loading ? (
        <PostDetailForm port={port} onClick={onClick} />
      ) : (
        <div className="loading__title">글을 불러오는 중입니다.</div>
      )}
    </>
  );
};
