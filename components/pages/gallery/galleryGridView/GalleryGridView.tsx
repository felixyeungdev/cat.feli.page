import { gallery } from "data/gallery";
import React from "react";
import ImageView from "../imageView/ImageView";

const GalleryGridView = () => {
    return (
        <div className="flex items-center justify-center bg-white">
            <div className="flex flex-col items-center max-w-[80rem] w-full mx-6 md:mx-10 my-8">
                <div className="grid grid-cols-2 gap-6 my-8 md:grid-cols-3">
                    {gallery.map((src, i) => (
                        <ImageView src={src} key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GalleryGridView;
