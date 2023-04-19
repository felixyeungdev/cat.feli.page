import Head from "next/head";

interface IProps {
    title?: string;
    description?: string;
}

const PageHeadFrag = ({ title, description }: IProps) => {
    const displayTitle = title ? `${title} | Cats` : `Cats`;

    return (
        <Head>
            <meta
                name="twitter:title"
                content={displayTitle}
                key="twitter-title"
            />
            <meta property="og:title" content={displayTitle} key="og-title" />
            <title key="title">{displayTitle}</title>
            <meta name="description" content={description} key="description" />
        </Head>
    );
};

export default PageHeadFrag;
