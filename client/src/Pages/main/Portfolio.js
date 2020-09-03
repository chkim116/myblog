import React from "react";
import PortfolioForm from "../../components/main/PortfoiloForm";
import FooterForm from "../../components/FooterForm";
import { useGetPort, useUserId } from "../../middleware";

const Portfolio = () => {
  const ports = useGetPort("/port");
  const { port, loading } = ports;
  const getUser = useUserId("/auth");
  const { userId } = getUser;
  const { admin } = userId;
  return (
    <>
      {loading ? (
        <>
          <PortfolioForm port={port} admin={admin}></PortfolioForm>
          <FooterForm />
        </>
      ) : (
        <div className="loading__title">로딩 중</div>
      )}
    </>
  );
};

export default Portfolio;
