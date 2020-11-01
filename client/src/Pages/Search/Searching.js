import React from "react";
import { useSelector } from "react-redux";
import { SearchingForm } from "../../components/Search/SearchingForm";
import { useGetTag } from "../../customHooks";
import { SeoMeta } from "../../SeoMeta";
import { Loading } from "../Etc/Loading";

export const Searching = ({ location }) => {
  const { search } = location;
  const { searchTags, loading } = useGetTag(`/tag/search${search}`);
  const admin = useSelector((state) => state.auth.admin);

  const data = {
    title: "검색결과 | Think_Thank",
    description: "내가 생각하는 창고, Think Tank",
    canonical: `search${search}`,
  };

  return (
    <>
      <SeoMeta data={data} />
      {loading ? (
        <>
          <SearchingForm
            admin={admin}
            loading={loading}
            searchTags={searchTags}
            search={search}></SearchingForm>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
