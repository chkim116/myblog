import React from "react";
import ReactQuill from "react-quill";

export const ReactQuillForm = ({ description, onValue }) => {
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
        },
        clipboard: { matchVisual: false },
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

    return (
        <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            defaultValue={description}
            name="description"
            placeholder="description"
            onChange={onValue}></ReactQuill>
    );
};
