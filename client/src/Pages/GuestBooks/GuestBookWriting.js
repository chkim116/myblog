import React, { useState, useEffect, useCallback } from "react";
import { GuestBookWritingForm } from "../../components/GuestBook/GuestBookWritingForm";
import Axios from "axios";
import { Helmet } from "react-helmet-async";
import { Loading } from "../Etc/Loading";

export const GuestBookWriting = ({ history }) => {
  const [guest, setGuest] = useState({
    title: "",
    description: "",
    createDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const onChange = useCallback(
    (e) => {
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
    },
    [guest]
  );

  const onSubmit = useCallback(
    (e) => {
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
    },
    [guest]
  );

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
