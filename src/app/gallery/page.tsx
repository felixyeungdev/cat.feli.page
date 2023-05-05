import PageTitle from "~/components/common/PageTitle";
import GalleryGridView from "~/components/pages/gallery/galleryGridView/GalleryGridView";
import { getAllGalleryItems } from "~/lib/cms/queries";

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
