import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";

interface Props {
    src: string;
}

const ImageView: React.FC<Props> = ({ src }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const image = new Image();

        const setDimensions = () => {
            const ww = window.innerWidth;
            const wh = window.innerHeight;
            const iw = image.width;
            const ih = image.height;

            const scale = Math.min(ww / iw, wh / ih);

            const w = iw * scale;
            const h = ih * scale;

            setWidth(w);
            setHeight(h);
        };

        image.addEventListener("load", setDimensions);
        window.addEventListener("resize", setDimensions);

        image.src = src;

        return () => {
            image.removeEventListener("load", setDimensions);
            window.addEventListener("resize", setDimensions);
        };
    }, [src]);
    return (
        <div className="flex justify-center">
            <img
                src={src}
                className="max-w-[20rem] w-full object-cover cursor-pointer"
                style={{ aspectRatio: "1/1" }}
                onClick={() => setIsOpen(true)}
            />
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} static>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50"
                        >
                            <div className="fixed inset-0 flex items-center justify-center bg-black">
                                <img src={src} style={{ width, height }} />
                            </div>
                            <button
                                className="fixed flex items-center justify-center w-12 h-12 text-4xl text-gray-300 bg-gray-500 rounded-full bg-opacity-[0] hover:bg-opacity-30 active:bg-opacity-60 top-2 left-4 transition-colors outline-none"
                                onClick={() => setIsOpen(false)}
                            >
                                <HiOutlineX />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Dialog>
        </div>
    );
};

export default ImageView;
