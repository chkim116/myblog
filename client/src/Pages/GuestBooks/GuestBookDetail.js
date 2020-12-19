import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetGuest } from "../../hook/customHooks";
import { GuestBookDetailForm } from "../../components/GuestBook/GuestBookDetailForm";
import Axios from "axios";
import { Loading } from "../Etc/Loading";
import { SeoMeta } from "../../SeoMeta";

export const GuestBookDetail = ({ history }) => {
    const { id } = useParams();

    // get portfolio
    const guests = useGetGuest(`/port/${id}`);
    const { guest, loading: pageLoading } = guests;

    //  delete auth

    const [loading, setLoding] = useState(false);

    const onClick = () => {
        const deletePost = async () => {
            await Axios.get(`/port/del/${id}`);
            setLoding(true);
        };
        if (window.confirm("정말 삭제하시겠습니까?")) {
            deletePost();
        }
    };

    useEffect(() => {
        if (loading) {
            history.push("/guestbook");
        }
    });

    const data = {
        title: guest.title,
        description: guest.title,
        canonical: `guestbookdetail/${id}`,
    };

    return (
        <>
            <SeoMeta data={data} />
            {pageLoading ? (
                <GuestBookDetailForm guest={guest} onClick={onClick} />
            ) : (
                <Loading />
            )}
        </>
    );
};
