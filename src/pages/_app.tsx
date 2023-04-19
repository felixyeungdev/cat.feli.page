import { AppType } from "next/app";
import Layout from "~/components/layout/Layout";
import "~/styles/global.css";
import { NextComponentTypeWithLayout } from "~/types/NextPage";

const MyApp: AppType = ({ Component, pageProps }) => {
    const getLayout =
        (Component as NextComponentTypeWithLayout).getLayout ??
        ((page) => <Layout>{page}</Layout>);

    return <>{getLayout(<Component {...pageProps} />)}</>;
};

export default MyApp;
