import { Metadata } from "next";
import PageTitle from "~/components/common/PageTitle";
import GalleryGridView from "~/components/pages/gallery/galleryGridView/GalleryGridView";
import { getAllGalleryItems } from "~/lib/cms/queries";

export const metadata: Metadata = {
    title: "Gallery",
    description: "Gallery of Felix's cats",
};

const GalleryPage = async () => {
    const gallery = await getAllGalleryItems();
    return (
        <>
            <PageTitle>Gallery</PageTitle>
            <GalleryGridView gallery={gallery} />
        </>
    );
};

export default GalleryPage;

export const revalidate = 60;
