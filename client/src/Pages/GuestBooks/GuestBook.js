import React from "react";
import FooterForm from "../../components/Layouts/FooterForm";
import { useGetPort, useUserId } from "../../middleware";
import { Helmet } from "react-helmet-async";
import GuestBookForm from "../../components/GuestBook/GuestBookForm";
import { Loading } from "../Etc/Loading";

const GuestBook = () => {
  const guests = useGetPort("/port");
  const { guest, loading } = guests;
  return (
    <>
      <Helmet>
        <title>My Blog | 방명록</title>
      </Helmet>
      {loading ? (
        <>
          <GuestBookForm port={guest}></GuestBookForm>
          <FooterForm />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default GuestBook;
