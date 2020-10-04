import React, { useState, useEffect } from "react";
import { PortEditForm } from "../../components/port/PortEditForm";
import { useGetPort } from "../../middleware";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Helmet } from "react-helmet-async";

export const PortEdit = ({ history }) => {
  const { id } = useParams();

  // get portfolio
  const ports = useGetPort(`/port/${id}`);
  const { port } = ports;

  const [updated, setUpdated] = useState("");
  const [loading, setLoading] = useState(false);

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
  const {
    title,
    description,
    imgUrl,
    category,
    createDate,
    update,
    link,
  } = updated;
  const onSubmit = (e) => {
    e.preventDefault();
    setUpdated({ ...updated });
    const updatePort = async () => {
      await Axios.post(`/port/edit/${id}`, {
        title,
        description,
        createDate,
        category,
        link,
        imgUrl,
      }).then((res) => setUpdated({ ...updated, update: true }));
    };
    updatePort();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUpdated({ ...updated, [name]: value });
  };

  useEffect(() => {
    if (update) {
      history.push("/portfolio");
    }
    // eslint-disable-next-line
  });

  if (!loading) {
    return (
      <div className="loading__title">디테일 화면 페이지로 이동 중입니다.</div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Blog | 수정 {port.title}</title>
      </Helmet>
      <PortEditForm port={port} onChange={onChange} onSubmit={onSubmit} />
    </>
  );
};
