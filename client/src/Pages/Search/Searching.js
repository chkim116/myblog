import React from "react";
import { Helmet } from "react-helmet-async";
import { SearchingForm } from "../../components/Search/SearchingForm";
import { useGetTag } from "../../middleware";
import { Loading } from "../Etc/Loading";

export const Searching = ({ location }) => {
  const { search } = location;
  const { searchTags, loading } = useGetTag(`/tag/search${search}`);

  return (
    <>
      <Helmet>
        <title>My Blog | {search.split("=")[1]} 검색결과</title>
      </Helmet>
      {loading ? (
        <SearchingForm searchTags={searchTags} search={search}></SearchingForm>
      ) : (
        <Loading />
      )}
    </>
  );
};
