import Post from "../models/post";

export const getTags = async (req, res) => {
    try {
        const tags = await Post.find({}, { tags: true }).sort({
            _id: -1,
        });
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
        res.status(200);
        res.json(tagsKeyValue.slice(0, 20));
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const getSearchingTags = async (req, res) => {
    const {
        query: { select, tag, text },
    } = req;

    try {
        let post;
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
    } catch (err) {
        res.status(400);
        console.log(err);
    }
};
