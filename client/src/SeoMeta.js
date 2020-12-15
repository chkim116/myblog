import React from "react";
import Helmet from "react-helmet";
import img from "./image/4.jpg";

export const SeoMeta = ({ data }) => {
    const lang = "ko";
    const title = data.title;
    const description = data.description;
    const image = img;
    const canonical = `https://www.kormelon.cf/${data.canonical}`;
    const type = data.type === undefined ? "article" : data.type;
    const width = data.image && (data.width || 1200);
    const height = data.image && (data.height || 630);
    const keywords = data.keywords;

    return (
        <Helmet>
            <html lang={lang} data-react-helemt="true" />
            <title data-react-helmet="true">{title}</title>
            <meta
                name="description"
                content={description}
                data-react-helmet="true"
            />
            {canonical ? (
                <link
                    rel="canonical"
                    href={canonical}
                    data-react-helmet="true"
                />
            ) : null}
            {image ? (
                <link rel="image_src" href={image} data-react-helmet="true" />
            ) : null}
            {image ? (
                <meta
                    itemprop="image"
                    content={image}
                    data-react-helmet="true"
                />
            ) : null}
            {keywords && (
                <meta
                    name="keywords"
                    content={keywords}
                    data-react-helmet="true"
                />
            )}
            <meta
                property="og:site_name"
                content="Think_Tank"
                data-react-helmet="true"
            />
            <meta
                property="og:title"
                content={title}
                data-react-helmet="true"
            />
            {description ? (
                <meta
                    property="og:description"
                    content={description}
                    data-react-helmet="true"
                />
            ) : null}
            {canonical ? (
                <meta
                    property="og:url"
                    content={canonical}
                    data-react-helmet="true"
                />
            ) : null}
            <meta
                property="og:locale"
                content={lang}
                data-react-helmet="true"
            />
            <meta property="og:type" content={type} data-react-helmet="true" />
            {image ? (
                <meta
                    property="og:image"
                    content={image}
                    data-react-helmet="true"
                />
            ) : null}
            {width ? (
                <meta
                    property="og:image:width"
                    content={width}
                    data-react-helmet="true"
                />
            ) : null}
            {height ? (
                <meta
                    property="og:image:height"
                    content={height}
                    data-react-helmet="true"
                />
            ) : null}
            <meta
                property="fb:pages"
                content="https://kormelon.cf"
                data-react-helmet="true"
            />

            <meta
                name="twitter:card"
                content="summary_large_image"
                data-react-helmet="true"
            />
            <meta
                name="twitter:title"
                content={title}
                data-react-helmet="true"
            />
            {description ? (
                <meta
                    name="twitter:description"
                    content={description}
                    data-react-helmet="true"
                />
            ) : null}
            {image ? (
                <meta
                    name="twitter:image"
                    content={image}
                    data-react-helmet="true"
                />
            ) : null}
            <meta
                name="twitter:site"
                content="https://kormelon.cf"
                data-react-helmet="true"
            />
            {canonical ? (
                <link
                    rel="alternate"
                    href={data.canonical}
                    hreflang={lang}
                    data-react-helmet="true"
                />
            ) : null}
        </Helmet>
    );
};
