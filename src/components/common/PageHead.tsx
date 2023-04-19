import Head from "next/head";

import PageHeadFrag from "./PageHeadFrag";

const PageHead = () => {
    return (
        <div>
            <Head>
                {/* <meta property="og:image" content="" /> */}
                <link rel="icon" href="/favicon.png" />
                {/* <link rel="manifest" href="/manifest.json" /> */}
                {/* <link rel="apple-touch-icon" href="" /> */}
                {/* <meta name="apple-mobile-web-app-capable" content="yes" /> */}

                <meta name="theme-color" content="#4f46e5" />
                <link
                    rel="search"
                    href="/open-search.xml"
                    title="ETS Search"
                    type="application/opensearchdescription+xml"
                />
            </Head>
            <PageHeadFrag />
        </div>
    );
};

export default PageHead;
