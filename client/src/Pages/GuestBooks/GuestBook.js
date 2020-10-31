import React, { useCallback, useState } from "react";
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

  const onClick = useCallback(
    (e) => {
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
      if (window.confirm("정말 삭제하시겠습니까?")) {
        deletePost();
      }
    },
    [del]
  );

  return (
    <>
      <Helmet>
        <title>My Blog | 방명록</title>
      </Helmet>
      {del && <Loading />}
      {loading ? (
        <>
          <GuestBookForm guest={guest} onClick={onClick}></GuestBookForm>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default GuestBook;
