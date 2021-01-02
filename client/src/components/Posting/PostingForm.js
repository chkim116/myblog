import React from "react";
import "./PostingForm.scss";
import { TagBox } from "./TagBox";

import { ReactQuillForm } from "./ReactQuillForm";
import { Loading } from "../../Pages/Etc/Loading";

const PostingForm = ({
    onTagDel,
    onSubmit,
    onChange,
    onTags,
    onTagsSubmit,
    tags,
    showTags,
    selectCategory,
    selectList,
    onSelect,
    post,
    categoryLoading,
}) => {
    return (
        <>
            {categoryLoading ? (
                <>
                    <form className="posting__form" onSubmit={onSubmit}>
                        <div className="posting__form-title">
                            <select
                                value={selectCategory}
                                onChange={onSelect}
                                required
                            >
                                <option value="none">선택</option>
                                {selectList &&
                                    selectList.map((list, index) => (
                                        <option
                                            key={index}
                                            value={list.category}
                                        >
                                            {list.category}
                                        </option>
                                    ))}
                            </select>
                            <input
                                required
                                type="text"
                                name="title"
                                placeholder="title"
                                onChange={onChange}
                            ></input>
                        </div>
                        <ReactQuillForm post={post}></ReactQuillForm>
                        <button className="form__submit" type="submit">
                            UPLOAD
                        </button>
                    </form>
                    <TagBox
                        onTags={onTags}
                        onTagDel={onTagDel}
                        onTagsSubmit={onTagsSubmit}
                        tags={tags}
                        showTags={showTags}
                    />
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default PostingForm;
