import CatPage from "~/components/pages/cat/CatPage";
import cats, { CatData } from "src/data/cats";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";

interface Props {
    cat: CatData;
}

const SesamePage: NextPage<Props> = ({ cat }) => {
    return (
        <>
            <CatPage cat={cat} />
        </>
    );
};

export default SesamePage;

export const getStaticPaths: GetStaticPaths = async (context) => {
    return {
        paths: Object.keys(cats).map((catId) => ({
            params: { catId },
        })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const catId = context.params.catId?.toString();

    const cat = cats[catId];

    if (!cat)
        return {
            notFound: true,
        };

    return { props: { cat } };
};
