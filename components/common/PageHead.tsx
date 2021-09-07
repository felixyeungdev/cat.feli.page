import Head from "next/head";
import React from "react";
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

                <meta name="theme-color" content="#f9a828" />
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
