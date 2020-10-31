import React, { useState, useEffect } from "react";
import { GuestBookEditForm } from "../../components/GuestBook/GuestBookEditForm";
import { useGetPort } from "../../middleware";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Helmet } from "react-helmet-async";
import { Loading } from "../Etc/Loading";
import { useSelector } from "react-redux";

export const GuestBookEdit = ({ history }) => {
  const { id } = useParams();

  // user
  const user = useSelector((state) => state.auth);

  // get GuestBook
  const guests = useGetPort(`/port/${id}`);
  const { guest } = guests;

  const [updated, setUpdated] = useState({
    title: "",
    description: "",
    creator: "",
    createDate: "",
    updata: "",
  });
  const [loading, setLoading] = useState(false);
  const [upGuest, setUpGuest] = useState(false);
  const { title, description, creator, createDate } = updated;

  // get previous GuestBook value
  useEffect(() => {
    const getPort = async () => {
      setUpGuest(true);
      try {
        await Axios.get(`/port/${id}`).then((res) => setUpdated(res.data));
      } catch (err) {
        console.log(err);
      }
      setUpGuest(false);
    };
    getPort();
    // eslint-disable-next-line
  }, []);

  // updated GuestBook

  const onSubmit = (e) => {
    e.preventDefault();
    setUpdated({ ...updated });
    const updatePort = async () => {
      setUpGuest(true);
      try {
        await Axios.post(`/port/edit/${id}`, {
          title,
          description,
          creator,
          createDate,
          updata: true,
        });
        setLoading(true);
      } catch (err) {
        console.log(err);
        alert("업데이트 실패");
      }
    };
    updatePort();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUpdated({ ...updated, [name]: value });
  };

  useEffect(() => {
    if (loading) {
      history.push("/guestbook");
    }
    // eslint-disable-next-line
  });

  if (upGuest) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>My Blog | 방명록 수정 {guest.title}</title>
      </Helmet>
      {user.id === guest.creator ? (
        <GuestBookEditForm
          guest={guest}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      ) : (
        <>
          {alert("잘못된 접근입니다.")} {history.push("/")}
        </>
      )}
    </>
  );
};
