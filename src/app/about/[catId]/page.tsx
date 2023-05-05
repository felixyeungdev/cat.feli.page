import { notFound } from "next/navigation";
import CatPage from "~/components/pages/cat/CatPage";
import { getAllCats, getCat } from "~/lib/cms/queries";

export const generateStaticParams = async () => {
    const cats = await getAllCats();

    return [];
    // return cats.map((cat) => ({ catId: cat.slug }));
};

const CatAboutPage = async ({ params }: { params: { catId: string } }) => {
    const cat = await getCat(params.catId);
    if (!cat) notFound();

    return (
        <>
            <CatPage cat={cat} />
        </>
    );
};

export default CatAboutPage;
