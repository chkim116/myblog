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
        <Helmet titleTemplate="%s">
            <html lang={lang} data-react-helemt="true" />
            <title>{title}</title>
            <meta name="description" content={description} />
            {canonical ? <link rel="canonical" href={canonical} /> : null}
            {image ? <link rel="image_src" href={image} /> : null}
            {image ? <meta itemprop="image" content={image} /> : null}
            {keywords && <meta name="keywords" content={keywords} />}
            <meta property="og:site_name" content="Think_Tank" />
            <meta property="og:title" content={title} />
            {description ? (
                <meta property="og:description" content={description} />
            ) : null}
            {canonical ? <meta property="og:url" content={canonical} /> : null}
            <meta property="og:locale" content={lang} />
            <meta property="og:type" content={type} />
            {image ? <meta property="og:image" content={image} /> : null}
            {width ? <meta property="og:image:width" content={width} /> : null}
            {height ? (
                <meta property="og:image:height" content={height} />
            ) : null}
            <meta property="fb:pages" content="https://kormelon.cf" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            {description ? (
                <meta name="twitter:description" content={description} />
            ) : null}
            {image ? <meta name="twitter:image" content={image} /> : null}
            <meta name="twitter:site" content="https://kormelon.cf" />
            {canonical ? (
                <link rel="alternate" href={data.canonical} hreflang={lang} />
            ) : null}
        </Helmet>
    );
};
