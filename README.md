## My Blog

### Think Tank

Consist of React & Node JS
<Br>
마이블로그 프로젝트는 MERN 스택을 활용,
직접 운영할 블로그를 만들기 위해 시작되었으며
MVC패턴으로 리액트와 노드 JS로 구성되었습니다.
<br>
관리자 샘플 아이디

```c
id : sample
pwd : 123456
```

[구경하기](https://www.kormelon.cf/)

---

## Features

####In Common

-   React-helmet-async : SEO 메타 태그 설정
-   <a href="#passport" style="color:black">Passport&Jwt : 회원가입 및 로그인</a>
-   <a href="#hashtag" style="color:black">HashTags : 해시태그 합계 및 검색</a>
-   <a href="#view" style="color:black">Today / Total : 페이지 방문자 IP 집계
    <br>

####Post

-   <a href="#category" style="color:black">Category : 포스트 카테고리</a>
-   <a href="#quill" style="color:black">React-quill : 포스팅을 담당하는 Rich Text Editor</a>
-   <a href="#pagination" style="color:black">Pagination : 게시글 페이지 넘버링</a>
-   <a href="#comment" style="color:black">Comment : 댓글 작성 (익명 가능)</a>
    <br>

####GuestBook

-   GuestBook : 방명록 작성 (익명 가능)
    <br>

####Search

-   <a href="#searchs" style="color:black">Search : 어디서나 제목, 본문, 태그 검색</a>

---

## key features

##<a id="hashtag" style="color:black">HashTags</a>

해시태그를 집계해 20개의 태그를 홈화면에 띄우고, 클릭 검색

-   태그를 집계하기 위해 reduce 함수를 사용

    #### CODE

    ```c
    src/controller/tagController.js

        ...
    const tags = await Post.find({}, { tags: true }).sort({ _id: -1 });

    let tagList = [];
    tags.map((array) => array.tags.map((tag) => tagList.push(tag)));

    const reduceTag = tagList.reduce((obj, current) => {
        if (!obj[current]) {
            obj[current] = 0;
        }
        obj[current]++;
        return obj;
    }, {});

    const tagsKeyValue = Object.entries(reduceTag).sort(
        (a, b) => b[1] - a[1]
    );
        ...
    ```

    <img src="./gif/hashtag.gif" />

---

##<a id="passport" style="color:black"> Passport&Jwt </a>
회원가입과 로그인

-   Passport와 Jwt토큰 사용

    #### CODE

    ```c
    src/controller/userController.js

    ...
        return res.cookie("x_auth", user.token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        .status(200)
        .json({ userId: user._id, token });
    ...
    ```

    ```c
    client/src/App.js

    ...
      useEffect(
        () => {
            if (token === "") {
                return console.log("can't");
            }
            const getUser = async () => {
                await Axios.get("/auth").then((res) =>
                    dispatch(getAuth(res.data))
                );
            };
            getUser();
        },
        [token]
    );
    ...
    ```

-   <img src="./gif/passport.gif" />

---

##<a id="quill" style="color:black">React-quill</a>

실제 블로그처럼 포스팅을 하기 위한 리액트 퀼 에디터 적용

-   <img src="./gif/posting.gif" />

---

##<a id="pagination" style="color:black">Pagination</a>

React-Pagination 패키지

-   페이징 넘버링
-   클릭 시, 백엔드에 쿼리로 요청

    #### CODE

    ```c
    src/controller/postController.js

    export const getPost = async (req, res) => {
        const page = parseInt(req.query.page || "1");
        const { filter } = req.query;

        if (page < 1) {
            res.status(400).send("페이지 에러");
            return;
        }
        try {
            const post = await Post.find(
                filter ? { category: decodeURI(filter) } : {}
            )
                .sort({ _id: -1 })
                .limit(6)
                .skip((page - 1) * 6)
                .exec();
            const postCount = await Post.countDocuments(
                filter ? { category: filter } : {}
            ).exec();
            res.json({ post, postCount });
        } catch (error) {
            console.log(error);
        }
    };
    ```

    ```c
    client/src/Pages/Posting/Post.js

        ...
    const [page, setPage] = useState({ query: search });
    const { query } = page;

    const { loading } = useGetPost(query ? `/api${query}` : "/api", location);

    const handleChange = (e) => {
        const { selected } = e;
        setPage({
            query: filter
                ? `?page=${selected + 1}&filter=${filter}`
                : `?page=${selected + 1}`,
        });
        history.push(
            filter
                ? `/post?page=${selected + 1}&filter=${filter}`
                : `/post?page=${selected + 1}`
        );
        document.querySelector("#root").scrollIntoView({ behavior: "smooth" });
    };
        ...

    ```

    <img src="./gif/pagination.gif" />

---

##<a id="category" style="color:black">Category</a>

포스트별 카테고리, 클릭 시 카테고리로 필터링한 게시글 출력

-   클릭시, 백엔드에 쿼리로 요청

    #### CODE

    ```c
    client/src/components/postCategory.js
        ...
    const onClick = (e) => {
        const { category } = e.target.dataset;
        const getPost = async () => {
            setLoading(true);
            try {
                await Axios.get(
                    category ? `/api?page=1&filter=${category}` : `/api?page=1`
                ).then((res) => {
                    dispatch(getPostByFilter(category, res.data.post));
                    dispatch(lastPage(Math.ceil(res.data.postCount / 6)));
                });
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        };
        getPost();
        history.push(
            category ? `/post?page=1&filter=${category}` : "/post?page=1"
        );
    };
        ...
    ```

    <img src="./gif/category.gif" />

---

##<a id="comment" style="color:black">Comment</a>
코멘트 등록 기능

-   로그아웃 상태에서도 가능 (익명)

    #### CODE

    ```c
    src/controller/postController.js

    export const postComments = async (req, res) => {
        const { id } = req.params;
        const {
            comment: { comment },
            createDate,
        } = req.body;
        try {
            const post = await Post.findById(id);
            const comments = await Comments.create({
                comment: comment,
                creator: req.user ? req.user.username : "익명",
                createDate: createDate,
            });
            post.comment.push(comments);
            post.save();
            res.status(200).json(comments);
        } catch (err) {
            res.status(400);
            console.log(err);
        }
    };
    ```

    <img src="./gif/comment.gif">

---

##<a id="searchs" style="color:black">Search</a>
어디서든 제목, 본문, 태그별로 검색

-   기본은 제목 검색

    #### CODE

    ```c
    src/controller/tagController.js

    export const getSearchingTags = async (req, res) => {
        ...
        let post;
        try {
            if (tag) {
                post = await Post.find({
                    tags: tag,
                }).sort({ _id: -1 });
            }
            if (select === "title") {
                post = await Post.find({ title: { $regex: text } }).sort({
                    _id: -1,
                });
            }
            if (select === "description") {
                post = await Post.find({ description: { $regex: text } }).sort({
                    _id: -1,
                });
            }
            if (select === "tags") {
                post = await Post.find({ tags: text }).sort({ _id: -1 });
            }
            res.status(200).json(post);
        }
        ...
    };
        ...
    ```

    ```c
    client/src/components/Search/SearchingBar.js

    const onSubmit = (e) => {
        e.preventDefault();
        setSearch({ select: "title", text: "" });
        dispatch(showSearchBar(false));
        history.push(`/search?select=${search.select}&text=${search.text}`);
    };
    ```

-   <img src="./gif/search.gif" />

---

##<a id="view" style="color:black">Today/Total</a>
하루/총 방문자 수 집계

-   방문 ip를 저장하여 중복된 아이피는 집계되지 않음
-   request-ip사용
-   매일 지정 시간때 토탈 합, 투데이 초기화

    #### CODE

    ```c
    src/controller/homeController.js

    export const checkIp = async (req, res, next) => {
        const clientIp = requestIp.getClientIp(req);
        const home = await Home.find({});
        if (home[0].ip.indexOf(clientIp) > -1) {
            console.log("아이피 중복으로 조회수 올라가지 않음.");
            res.json(home[0]);
            return;
        } else {
            next();
        }
    };

    export const totalView = async (req, res) => {
        const home = await Home.find({});
        const { totalView, _id, views } = home[0];
        await Home.findOneAndUpdate(
            { _id },
            { views: 0, totalView: totalView + views, ip: [] }
    );
    ```

-   <img src="./gif/조회수.png" />

---

### Stack

-   [x] MongoDB
-   [x] Express
-   [x] React
-   [x] Node JS
-   [x] Sass/Scss
-   [x] Babel
-   [x] Hooks/Redux

### DEPLOY

-   [x] Heroku
-   [x] Netlify
