import React from "react";

const FixedLoading = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return (
        <div className="loading">
            <div className="loading__title"></div>
        </div>
    );
};

export default FixedLoading;
