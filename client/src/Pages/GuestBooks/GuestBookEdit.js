import React, { useState, useEffect } from "react";
import { GuestBookEditForm } from "../../components/GuestBook/GuestBookEditForm";
import { useGetPort } from "../../middleware";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Helmet } from "react-helmet-async";
import { Loading } from "../Etc/Loading";

export const GuestBookEdit = ({ history }) => {
  const { id } = useParams();

  // get portfolio
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
  const { title, description, creator, createDate, updata } = updated;

  // get previous portfolio value
  useEffect(() => {
    const getPort = async () => {
      try {
        await Axios.get(`/port/${id}`).then((res) => setUpdated(res.data));
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };
    getPort();
    // eslint-disable-next-line
  }, []);

  // updated portfolio

  const onSubmit = (e) => {
    e.preventDefault();
    setUpdated({ ...updated });
    setUpGuest(true);
    const updatePort = async () => {
      try {
        await Axios.post(`/port/edit/${id}`, {
          title,
          description,
          creator,
          createDate,
          updata: true,
        });
      } catch (err) {
        console.log(err);
        alert("업데이트 실패");
        setUpGuest(false);
      }
    };
    updatePort();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUpdated({ ...updated, [name]: value });
  };

  useEffect(() => {
    if (upGuest) {
      history.push("/guestbook");
    }
    // eslint-disable-next-line
  });

  if (!loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>My Blog | 방명록 수정 {guest.title}</title>
      </Helmet>
      {upGuest && <Loading />}
      <GuestBookEditForm port={guest} onChange={onChange} onSubmit={onSubmit} />
    </>
  );
};
