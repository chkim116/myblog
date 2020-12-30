import React from "react";
import { Skeleton } from "antd";
import "antd/dist/antd.css";

export const Loading = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <div className="skeleton">
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
        </div>
    );
    // <div className="loading">
    /* <div className='loading__title'></div> */
    // </div>
};
