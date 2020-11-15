import React, { createElement, useRef } from "react";
import ReactQuill from "react-quill";

export const ReactQuillForm = ({ description, onValue }) => {
    const quill = useRef();

    const handleImage = () => {
        const input = createElement("input");

        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");

        input.click();
    };

    const modules = {
        toolbar: {
            container: [
                [{ font: [] }],
                [{ size: ["small", false, "large", "huge"] }],
                [{ color: [] }],
                ["bold", "italic", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["code-block"],
                ["link"],
                ["image"],
            ],
            handlers: {
                image: handleImage,
            },
        },
        syntax: true,
    };

    const formats = [
        "font",
        "size",
        "bold",
        "italic",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "align",
        "direction",
        "code-block",
        "color",
        "link",
        "image",
    ];

    const quillEl = quill.current;

    return (
        <ReactQuill
            theme="snow"
            ref={quill}
            modules={modules}
            formats={formats}
            defaultValue={description}
            name="description"
            placeholder="description"
            onChange={onValue}></ReactQuill>
    );
};
