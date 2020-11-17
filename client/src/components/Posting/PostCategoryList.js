import React from "react";
import "./PostCategory.scss";

export const PostCategoryList = ({
    createList,
    post,
    onClick,
    onDel,
    onEdit,
    admin,
    editShow,
    onEditSubmit,
    onEditChange,
    onDelClick,
    del,
}) => {
    return (
        <>
            <div className="category__form">
                {createList &&
                    createList.map((li, index) => (
                        <div key={index}>
                            <div
                                data-category={li.category}
                                onClick={onClick}
                                className={"category__form-list"}>
                                {li.category}
                                <span className="category-length">
                                    {post.filter(
                                        (p) => p.category === li.category
                                    ).length || 0}
                                </span>
                                {editShow && (
                                    <form
                                        className="category__edit-form"
                                        onSubmit={onEditSubmit}>
                                        <input
                                            data-id={li._id}
                                            className="category__edit-input"
                                            type="text"
                                            defaultValue={li.category}
                                            onChange={onEditChange}
                                        />
                                        <div
                                            className="category__edit-btn"
                                            onClick={onEdit}>
                                            X
                                        </div>
                                        <button
                                            className="category__edit-btn"
                                            type="submit">
                                            O
                                        </button>
                                    </form>
                                )}
                                {admin && (
                                    <span>
                                        {del && (
                                            <span
                                                data-id={li._id}
                                                className="category__del"
                                                key={index + 1}
                                                onClick={onDel}>
                                                X
                                            </span>
                                        )}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
            {admin && (
                <>
                    <span className="category__edit" onClick={onEdit}>
                        <span role="img" aria-label="✍">
                            ✍
                        </span>
                    </span>
                    <span className="category__delete" onClick={onDelClick}>
                        <span>X</span>
                    </span>
                </>
            )}
        </>
    );
};
