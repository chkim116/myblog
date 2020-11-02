import React, { useState, useEffect, useCallback } from "react";
import { GuestBookEditForm } from "../../components/GuestBook/GuestBookEditForm";
import { useGetGuest } from "../../customHooks";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Loading } from "../Etc/Loading";
import { useSelector } from "react-redux";
import { SeoMeta } from "../../SeoMeta";

export const GuestBookEdit = ({ history }) => {
  const { id } = useParams();

  // user
  const user = useSelector((state) => state.auth);

  // get GuestBook
  const guests = useGetGuest(`/port/${id}`);
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

  // updated GuestBook

  const onSubmit = useCallback(
    (e) => {
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
    },
    [id, updated]
  );

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setUpdated({ ...updated, [name]: value });
    },
    [updated]
  );

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

  useEffect(() => {
    if (loading) {
      history.push("/guestbook");
    }
    // eslint-disable-next-line
  }, [loading]);

  if (upGuest) {
    return <Loading />;
  }

  const data = {
    title: "방명록 수정 | Think_Thank",
    description: "내가 생각하는 창고, Think Tank",
    canonical: `guestbookedit/${id}`,
  };

  return (
    <>
<<<<<<< HEAD
      <Helmet>
        <title>My Blog | 방명록 수정 {guest.title}</title>
      </Helmet>
      <GuestBookEditForm
        guest={guest}
        onChange={onChange}
        onSubmit={onSubmit}
        user={user}
=======
      <SeoMeta data={data} />
      <GuestBookEditForm
        user={user}
        guest={guest}
        onChange={onChange}
        onSubmit={onSubmit}
>>>>>>> 61bc4913be17f9f89f8af44729596b36bd99ffea
      />
    </>
  );
};
