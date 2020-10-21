import React from "react";

export const Loading = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className='loading'>
      <div className='loading__title'></div>
    </div>
  );
};
