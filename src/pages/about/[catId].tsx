import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import CatPage from "~/components/pages/cat/CatPage";
import { getAllCats, getCat } from "~/lib/cms/queries";
import { Cat } from "~/lib/cms/types";

interface Props {
    cat: Cat;
}

const CatAboutPage: NextPage<Props> = ({ cat }) => {
    return (
        <>
            <CatPage cat={cat} />
        </>
    );
};

export default CatAboutPage;

export const getStaticPaths: GetStaticPaths = async (context) => {
    const cats = await getAllCats();

    return {
        paths: cats.map((cat) => ({ params: { catId: cat.slug } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const catId = context.params.catId?.toString();

    const cat = await getCat(catId);

    if (!cat) {
        return {
            notFound: true,
        };
    }

    return {
        props: { cat },
        revalidate: 60,
    };
};
