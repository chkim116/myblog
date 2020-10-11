import React, { useState, useEffect } from "react";
import { GuestBookWritingForm } from "../../components/GuestBook/GuestBookWritingForm";
import Axios from "axios";
import { Helmet } from "react-helmet-async";
import { Loading } from "../Etc/Loading";

export const GuestBookWriting = ({ history }) => {
  const initialState = {
    title: "",
    description: "",
    createDate: "",
  };

  const [guest, setGuest] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setGuest({
      ...guest,
      [name]: value,
      createDate: new Date().toLocaleString("ko-KR", {
        timeZone: "Asia/Seoul",
        hour12: false,
      }),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setMessage(true);
    const postGuestBook = async () => {
      try {
        await Axios.post("/port/post", guest);
        setLoading(true);
      } catch (err) {
        console.log(err);
        alert("업로드 실패");
        setMessage(false);
        setLoading(false);
      }
    };
    postGuestBook();
  };

  useEffect(() => {
    if (loading) {
      history.push("/guestbook");
    }
  });

  return (
    <>
      {message && <Loading />}
      <Helmet>
        <title>My Blog | 방명록 작성</title>
      </Helmet>
      <GuestBookWritingForm onChange={onChange} onSubmit={onSubmit} />
    </>
  );
};
