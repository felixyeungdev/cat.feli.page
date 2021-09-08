import GalleryGridView from "components/pages/gallery/galleryGridView/GalleryGridView";
import Gallery from "components/pages/gallery/title/Gallery";
import React from "react";

const GalleryPage = () => {
    return (
        <>
            <Gallery />
            <GalleryGridView />
        </>
    );
};

export default GalleryPage;
