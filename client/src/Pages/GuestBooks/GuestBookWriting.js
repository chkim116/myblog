import React, { useState, useEffect } from "react";
import { GuestBookWritingForm } from "../../components/GuestBook/GuestBookWritingForm";
import Axios from "axios";
import { Loading } from "../Etc/Loading";
import { SeoMeta } from "../../SeoMeta";

export const GuestBookWriting = ({ history }) => {
  const [guest, setGuest] = useState({
    title: "",
    description: "",
    createDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setGuest({
      ...guest,
      [name]: value,
      createDate: new Date().toLocaleTimeString("ko-KR", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
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
      }
      setLoading(false);
    };
    postGuestBook();
  };

  useEffect(() => {
    if (loading) {
      history.push("/guestbook");
    }
  });

  const data = {
    title: "방명록 작성 | Think_Thank",
    description: "내가 생각하는 창고, Think Tank",
    canonical: `guestbooking`,
  };

  return (
    <>
      <SeoMeta data={data} />
      {message && <Loading />}
      <GuestBookWritingForm onChange={onChange} onSubmit={onSubmit} />
    </>
  );
};
