import React from "react";
import "~/styles/global.css";
import { AppProps } from "next/dist/shared/lib/router/router";
import Layout from "~/components/layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
