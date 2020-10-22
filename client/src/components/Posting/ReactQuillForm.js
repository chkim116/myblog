import Axios from "axios";
import React, { useRef } from "react";
import ReactQuill from "react-quill";

export const ReactQuillForm = ({ description, onValue }) => {
  const quill = useRef();

  const imageHandler = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    console.log(quill);

    // input.onchange = async () => {
    //   const file = input.files[0];
    //   const formData = new FormData();

    //   formData.append("image", file);

    //   const range = quill.current.getSelection(true);

    //   quill.current.insertEmbed(
    //     range.index,
    //     "image",
    //     `${window.location.origin}/images/loaders/placeholder.gif`
    //   );

    //   quill.current.setSelection(range.index + 1);

    //   const res = await Axios.post("/api/image", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }).then((res) => res.data);
    //   quill.current.deleteText(range.index, 1);
    //   quill.insertEmbed(range.index, "image", res);
    // };
  };

  const modules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["code-block"],
        [({ color: [] }, { background: [] })],
        ["link", "image", "video"],
      ],
    },
  };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "align",
    "direction",
    "code-block",
    "color",
    "background",
    "link",
    "image",
    "video",
  ];
  return (
    <ReactQuill
      ref={quill}
      theme='snow'
      modules={modules}
      formats={formats}
      defaultValue={description}
      name='description'
      placeholder='description'
      onChange={onValue}></ReactQuill>
  );
};
