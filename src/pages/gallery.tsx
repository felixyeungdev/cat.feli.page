import { GetStaticProps, NextPage } from "next";
import PageTitle from "~/components/common/PageTitle";
import GalleryGridView from "~/components/pages/gallery/galleryGridView/GalleryGridView";
import { GalleryItem, getAllGalleryItems } from "~/lib/sanity.client";

interface Props {
    gallery: GalleryItem[];
}

const GalleryPage: NextPage<Props> = ({ gallery }) => {
    return (
        <>
            <PageTitle>Gallery</PageTitle>
            <GalleryGridView gallery={gallery} />
        </>
    );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const gallery = await getAllGalleryItems();

    return {
        props: { gallery },
        revalidate: 60,
    };
};

export default GalleryPage;
