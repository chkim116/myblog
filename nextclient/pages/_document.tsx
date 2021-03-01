import Document, { Head, Html, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta
                        name="google-site-verification"
                        content="MPhQP-08gK_1FBW1Emlawk5ntSUn7TeX0o1vDtTITAw"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript></NextScript>
                </body>
            </Html>
        )
    }
}
