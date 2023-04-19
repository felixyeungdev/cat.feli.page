// from https://github.com/sanity-io/nextjs-blog-cms-sanity-v3

import { NextStudio } from "next-sanity/studio";
import { NextStudioHead } from "next-sanity/studio/head";
import Head from "next/head";
import { StudioLayout, StudioProvider } from "sanity";
import config from "sanity.config";
import { createGlobalStyle } from "styled-components";
import { NextPageWithLayout } from "~/types/NextPage";

const GlobalStyle = createGlobalStyle(({ theme }) => ({
    html: { backgroundColor: theme.sanity.color.base.bg },
}));

const StudioPage: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <NextStudioHead favicons={false} />
            </Head>

            <NextStudio config={config}>
                <StudioProvider config={config}>
                    <GlobalStyle />
                    <StudioLayout />
                </StudioProvider>
            </NextStudio>
        </>
    );
};

StudioPage.getLayout = (page) => page;

export default StudioPage;
