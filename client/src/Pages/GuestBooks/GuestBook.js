import React, { useState } from "react";
import { useGetGuest } from "../../customHooks";
import GuestBookForm from "../../components/GuestBook/GuestBookForm";
import { Loading } from "../Etc/Loading";
import Axios from "axios";
import { SeoMeta } from "../../SeoMeta";

const GuestBook = () => {
    const guests = useGetGuest("/port");
    const { guest, loading } = guests;

    // del
    const [del, setDel] = useState(false);

    const onClick = (e) => {
        const boardId = e.target.dataset.id;
        const deletePost = async () => {
            setDel(true);
            try {
                await Axios.get(`/port/del/${boardId}`);
            } catch (err) {
                console.log(err);
                alert("삭제에 실패했습니다.");
            }
            setDel(false);
        };
        if (window.confirm("정말 삭제하시겠습니까?")) {
            deletePost();
            window.location.reload();
        }
    };

    const data = {
        title: "방명록 | Think_Thank",
        description: "내가 생각하는 창고, Think Tank",
        canonical: `guestbook`,
    };

    return (
        <>
            <SeoMeta data={data} />
            {del && <Loading />}
            {loading ? (
                <>
                    <GuestBookForm
                        guest={guest}
                        onClick={onClick}></GuestBookForm>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default GuestBook;
