import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetPort } from "../../middleware";
import { GuestBookDetailForm } from "../../components/GuestBook/GuestBookDetailForm";
import Axios from "axios";
import { Helmet } from "react-helmet-async";
import { Loading } from "../Etc/Loading";

export const GuestBookDetail = ({ history }) => {
  const { id } = useParams();

  // get portfolio
  const guests = useGetPort(`/port/${id}`);
  const { guest, loading: pageLoading } = guests;

  //  delete auth

  const [loading, setLoding] = useState(false);

  const onClick = () => {
    const deletePost = async () => {
      await Axios.get(`/port/del/${id}`);
      setLoding(true);
    };
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deletePost();
    }
  };

  useEffect(() => {
    if (loading) {
      history.push("/guestbook");
    }
  });

  return (
    <>
      <Helmet>
        <title>My Blog | {guest.title}</title>
      </Helmet>
      {pageLoading ? (
        <GuestBookDetailForm guest={guest} onClick={onClick} />
      ) : (
        <Loading />
      )}
    </>
  );
};
