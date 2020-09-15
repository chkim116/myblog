import React, { useState, useEffect } from "react";
import { PortWritingForm } from "../../components/port/PortWritingForm";
import Axios from "axios";
import { Helmet } from "react-helmet-async";

export const PortWriting = ({ history }) => {
  const initialState = {
    title: "",
    description: "",
    imgUrl: "",
    createDate: "",
    category: "",
  };

  const [port, setPort] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { title, description, imgUrl, createDate, category } = port;

  const onChange = (e) => {
    const { name, value } = e.target;
    setPort({ ...port, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const postPortFolio = async () => {
      try {
        await Axios.post("/port/post", {
          title,
          description,
          imgUrl,
          createDate,
          category,
        }).then((res) => setLoading(res.data));
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    postPortFolio();
  };

  useEffect(() => {
    if (loading) {
      history.push("/portfolio");
    }
  });

  return (
    <>
      <Helmet>
        <title>My Blog | 글 작성</title>
      </Helmet>
      <PortWritingForm onChange={onChange} onSubmit={onSubmit} />
    </>
  );
};
