import React, { useEffect } from "react";
import { SearchingForm } from "../../components/Search/SearchingForm";
import { useGetTag } from "../../middleware";

export const Searching = ({ location }) => {
  const { search } = location;
  const { searchTags, loading } = useGetTag(`/tag/search${search}`);
  console.log(searchTags, loading);

  return (
    <>
      <SearchingForm></SearchingForm>
    </>
  );
};
