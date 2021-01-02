import React, { useRef } from "react";
import Quill from "quill";

export const ReactQuillForm = ({ description, setPost, post, edit }) => {
    const quillElement = useRef();
    const quillInstance = useRef();
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

    useEffect(() => {
        if (quillElement.current || Quill) {
            quillInstance.current = new Quill(quillElement.current, {
                theme: "snow",
                modules,
                formats,
            });

            const onClickImg = () => {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
                input.click();

                input.onchange = async () => {
                    const file = input.files[0];
                    const formData = new FormData();
                    formData.append("image", file);

                    // 현재 커서 위치 저장
                    const range = quill.getSelection(true);
                    // 현재 위치에 이미지 놓기
                    quill.insertEmbed(range.index, "image", "");
                    // 다음 위치에 커서 옮기기
                    quill.setSelection(range.index + 1);

                    // 이미지 api
                    const postImg = () => {
                        return Axios.post("/api/img", formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }).then((res) => res.data);
                    };
                    // 등록된 이미지 삭제
                    quill.deleteText(range.index, 1);

                    // api로 받아온 이미지 추가
                    const img = await postImg();
                    quill.insertEmbed(range.index, "image", img);

                    // 다음 위치에 커서 옮기기
                    quill.setSelection(range.index + 1);
                };
            };

            const quill = quillInstance.current;

            quill.on("text-change", (delta, oldDelta, source) => {
                if (source === "user") {
                    edit
                        ? setPost({
                              ...post,
                              description: quill.root.innerHTML,
                              updated: "(수정됨)",
                          })
                        : setPost({
                              ...post,
                              description: quill.root.innerHTML,
                          });
                }
            });
            quill.getModule("toolbar").addHandler("image", onClickImg);
        }
    }, []);

    useEffect(() => {
        if (description !== undefined) {
            if (quillElement.current || Quill) {
                const quill = quillInstance.current;
                quill.root.innerHTML = description;
            }
        }
    }, [description]);

    return (
        <div ref={quillElement}>
            <div ref={quillInstance}></div>
            {/* <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                defaultValue={description}
                name="description"
                placeholder="description"
                onChange={onValue}
            ></ReactQuill> */}
        </div>
    );
};
