import React, { useState } from "react";
import FooterForm from "../../components/Layouts/FooterForm";
import { useGetPort } from "../../middleware";
import { Helmet } from "react-helmet-async";
import GuestBookForm from "../../components/GuestBook/GuestBookForm";
import { Loading } from "../Etc/Loading";
import Axios from "axios";

const GuestBook = () => {
  const guests = useGetPort("/port");
  const { guest, loading } = guests;

  // del
  const [del, setDel] = useState(false);

  const onClick = (e) => {
    const boardId = e.target.dataset.id;
    const deletePost = async () => {
      setDel(true);
      try {
        await Axios.get(`/port/del/${boardId}`);
        window.location.reload();
      } catch (err) {
        console.log(err);
        setDel(false);
        alert("삭제에 실패했습니다.");
      }
    };
    deletePost();
  };

  return (
    <>
      <Helmet>
        <title>My Blog | 방명록</title>
      </Helmet>
      {del && <Loading />}
      {loading ? (
        <>
          <GuestBookForm port={guest} onClick={onClick}></GuestBookForm>
          <FooterForm />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default GuestBook;
