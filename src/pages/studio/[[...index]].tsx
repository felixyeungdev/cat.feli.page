// from https://github.com/sanity-io/nextjs-blog-cms-sanity-v3

import { NextPage } from "next";
import { NextStudio } from "next-sanity/studio";
import { NextStudioHead } from "next-sanity/studio/head";
import Head from "next/head";
import { StudioLayout, StudioProvider } from "sanity";
import config from "sanity.config";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle(({ theme }) => ({
    html: { backgroundColor: theme.sanity.color.base.bg },
}));

const StudioPage: NextPage = () => {
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

export default StudioPage;
