import { useState, useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPostByFilter, lastPage, getCategoryList } from "./Modules/post";

export function registerCheck(err, url, { history }) {
    const {
        data: { message },
    } = err.response;
    if (message !== undefined) {
        history.push(`/${url}`);
        alert(`${message}`);
    }
}

// get Post Hooks

export const useGetPost = (url, location) => {
    const dispatch = useDispatch();
    let filter = useSelector((state) => state.post.filter);

    const [loading, setLoading] = useState(false);
    const getPost = async () => {
        setLoading(false);
        try {
            await Axios.get(url).then((res) => {
                dispatch(getPostByFilter(filter, res.data.post));
                dispatch(lastPage(Math.ceil(res.data.postCount / 6)));
            });
            setLoading(true);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (location) {
            if (location.search.indexOf("filter") > -1) {
                filter = decodeURI(location.search.split("&")[1].split("=")[1]);
            }
        }
        getPost();
    }, [url || filter]);
    return { loading };
};

// get post by id

export const useGetPostById = (url) => {
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({});
    const dispatch = useDispatch();

    const getPost = async () => {
        setLoading(false);
        try {
            await Axios.get(url).then((res) => {
                setPost(res.data);
                dispatch(lastPage(Math.ceil(res.data.postCount / 6)));
            });
            setLoading(true);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getPost();
    }, []);
    return { loading, post };
};

// get GuestBook

export const useGetGuest = (url) => {
    const [guest, setGuest] = useState({
        title: "",
        description: "",
        createDate: "",
        creator: "",
        username: "",
        updata: false,
    });
    const [loading, setLoading] = useState(false);

    const getGuest = async () => {
        try {
            await Axios.get(url).then((res) => setGuest(res.data));
            setLoading(true);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getGuest();
        // eslint-disable-next-line
    }, []);

    return { guest, loading };
};

// get Tags

export const useGetTag = (url) => {
    const [searchTags, setSearchTags] = useState({
        title: "",
        description: "",
        createDate: "",
        creator: "",
        username: "",
        updata: false,
        tags: [],
        comment: [],
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getSearchTags = async () => {
            try {
                await Axios.get(url).then((res) => setSearchTags(res.data));
                setLoading(true);
            } catch (err) {
                console.log(err);
            }
        };
        getSearchTags();
    }, [url]);

    return { searchTags, loading };
};

// get category

export const useGetCategory = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategory = async () => {
            setLoading(true);
            await Axios.get("/category").then((res) =>
                dispatch(getCategoryList(res.data))
            );
            setLoading(false);
        };
        getCategory();
    }, [dispatch]);

    return { loading };
};
