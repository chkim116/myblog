import React from "react";
import "./PortWritingForm.scss";
export const PortEditForm = ({ port, onChange, onSubmit }) => {
  const { title, description, category, createDate } = port;
  return (
    <>
      <form className="port__form" onChange={onChange} onSubmit={onSubmit}>
        <input type="date" name="createDate" defaultValue={createDate}></input>
        <input
          type="text"
          name="title"
          placeholder="title"
          defaultValue={title}
        />
        <textarea
          type="text"
          name="description"
          placeholder="description"
          defaultValue={description}
        />
        <input type="file" name="imgUrl" placeholder="image" />
        <input
          className="tags"
          type="text"
          name="category"
          placeholder="태그"
          defaultValue={category}
        />
        <input className="form__submit" type="submit" value="submit"></input>
      </form>
    </>
  );
};
