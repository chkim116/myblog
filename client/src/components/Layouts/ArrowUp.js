import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import "./ArrowUp.scss";

export const ArrowUp = ({ onClick }) => {
  return (
    <div className='arrowup' onClick={onClick}>
      <AiOutlineArrowUp size={26} />
    </div>
  );
};
