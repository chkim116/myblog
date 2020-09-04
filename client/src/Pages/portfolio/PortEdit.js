import React, { useState, useEffect } from "react";
import { PortEditForm } from "../../components/port/PortEditForm";
import { useGetPort } from "../../middleware";
import { useParams } from "react-router-dom";
import Axios from "axios";

export const PortEdit = ({ history }) => {
  const { id } = useParams();
  const ports = useGetPort(`/port/${id}`);
  const { port, loading } = ports;

  const [updated, setUpdated] = useState({ ...port, update: "" });
  const { title, description, imgUrl, category, createDate, update } = updated;

  const onSubmit = (e) => {
    e.preventDefault();
    setUpdated({ ...setUpdated });
    const updatePort = async () => {
      await Axios.post(`/port/edit/${id}`, {
        title,
        description,
        createDate,
        category,
        imgUrl,
      }).then((res) => setUpdated({ ...updated, update: true }));
    };
    updatePort();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUpdated({ ...port, [name]: value });
    console.log(updated);
  };

  useEffect(() => {
    if (update) {
      history.push("/portfolio");
    }
    // eslint-disable-next-line
  });

  return (
    <>
      {loading ? (
        <PortEditForm port={port} onChange={onChange} onSubmit={onSubmit} />
      ) : (
        <div className="loading__title">
          디테일 화면 페이지로 이동 중입니다.
        </div>
      )}
    </>
  );
};
