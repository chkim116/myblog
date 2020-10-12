import React, { useEffect, useState } from "react";
import "./PostingForm.scss";
import ReactQuill from "react-quill";

import { modules, formats } from "../../middleware";
import { Loading } from "../../Pages/Etc/Loading";

const PostingForm = ({
  onSubmit,
  onChange,
  onValue,
  quillRef,
  reactQuillRef,
}) => {
  const [loading, setLoading] = useState("");
  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) {
    return <Loading />;
  }

  return (
    <>
      <form className='posting__form' onSubmit={onSubmit}>
        <input
          type='text'
          name='title'
          maxLength='12'
          placeholder='title'
          onChange={onChange}></input>
        <ReactQuill
          ref={reactQuillRef}
          theme='snow'
          modules={modules}
          formats={formats}
          name='description'
          placeholder='description'
          onChange={onValue}></ReactQuill>
        <button className='form__submit' type='submit'>
          UPLOAD
        </button>
      </form>
    </>
  );
};

export default PostingForm;
