import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetPort, useUserId } from "../../middleware";
import { GuestBookDetailForm } from "../../components/GuestBook/GuestBookDetailForm";
import Axios from "axios";
import { Helmet } from "react-helmet-async";
import { Loading } from "../Etc/Loading";

export const GuestBookDetail = ({ history }) => {
  const { id } = useParams();

  // get portfolio
  const guests = useGetPort(`/port/${id}`);
  const { guest, loading } = guests;

  // admin auth
  const loggedUser = useUserId("/auth");
  const {
    userId: { id: userId },
  } = loggedUser;

  //  delete auth

  const [del, setDel] = useState(false);
  const onClick = () => {
    const deletePost = async () => {
      await Axios.get(`/port/del/${id}`).then((res) => setDel(res.data));
    };
    deletePost();
  };

  useEffect(() => {
    if (del) {
      history.push("/guestbook");
    }
  });

  return (
    <>
      <Helmet>
        <title>My Blog | {guest.title}</title>
      </Helmet>
      {loading ? (
        <GuestBookDetailForm port={guest} onClick={onClick} userId={userId} />
      ) : (
        <Loading />
      )}
    </>
  );
};
