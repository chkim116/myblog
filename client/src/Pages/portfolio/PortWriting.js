import React, { useState, useEffect } from "react";
import { PortWritingForm } from "../../components/port/PortWritingForm";
import Axios from "axios";
import { Helmet } from "react-helmet-async";

export const PortWriting = ({ history }) => {
  const initialState = {
    title: "",
    description: "",
    createDate: "",
    category: "",
  };

  const [port, setPort] = useState(initialState);
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const { title, description, createDate, category } = port;

  const onChange = (e) => {
    const { name, value } = e.target;
    setPort({ ...port, [name]: value, imgUrl: image });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setMessage(true);
    const postPortFolio = async () => {
      const formData = new FormData();
      for (let i = 0; i < image.length; i++) {
        formData.append("imgUrl", image[i]);
      }
      formData.append(
        "value",
        JSON.stringify({ title, description, createDate, category })
      );
      try {
        await Axios.post("/port/post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setLoading(true);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    postPortFolio();
  };

  const onImage = (e) => {
    const { files } = e.target;
    setImage(files);
    setPort({ ...port, imgUrl: files });
  };

  useEffect(() => {
    if (loading) {
      history.push("/portfolio");
    }
  });

  return (
    <>
      {message && <div className="loading__bar">업로드 중입니다</div>}
      <Helmet>
        <title>My Blog | 글 작성</title>
      </Helmet>
      <PortWritingForm
        onChange={onChange}
        onImage={onImage}
        onSubmit={onSubmit}
      />
    </>
  );
};
