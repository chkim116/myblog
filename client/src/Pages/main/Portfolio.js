import React from "react";
import PortfolioForm from "../../components/main/PortfoiloForm";
import FooterForm from "../../components/FooterForm";
import { useGetPort } from "../../middleware";

const Portfolio = () => {
  const ports = useGetPort("/port");
  const { port, loading } = ports;

  return (
    <>
      {loading ? (
        <>
          <PortfolioForm port={port}></PortfolioForm>
          <FooterForm />
        </>
      ) : (
        <div className="loading__title">로딩 중</div>
      )}
    </>
  );
};

export default Portfolio;
