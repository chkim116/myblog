import React from "react";

export const SearchingBarForm = ({ onClick, onSubmit, search, onChange }) => {
    return (
        <>
            <div className="searchingbar">
                <form
                    className="searchingbar__form"
                    onChange={onChange}
                    onSubmit={onSubmit}>
                    <span className="searchingbar-del" onClick={onClick}>
                        X
                    </span>
                    <select className="searchingbar-select" name="select">
                        <option value="title">제목</option>
                        <option value="description">본문</option>
                        <option value="tags">태그</option>
                    </select>
                    <input
                        defaultValue={search.text}
                        name="text"
                        className="searchingbar-input"
                        type="text"
                        placeholder="검색어를 입력하세요"
                    />
                    <button className="searchingbar-btn" type="submit">
                        검색
                    </button>
                </form>
            </div>
        </>
    );
};
