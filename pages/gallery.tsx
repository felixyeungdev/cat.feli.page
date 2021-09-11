import PageTitle from "components/common/PageTitle";
import GalleryGridView from "components/pages/gallery/galleryGridView/GalleryGridView";
import React from "react";

const GalleryPage = () => {
    return (
        <>
            <PageTitle>Gallery</PageTitle>
            <GalleryGridView />
        </>
    );
};

export default GalleryPage;
