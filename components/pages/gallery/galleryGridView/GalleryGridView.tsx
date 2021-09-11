import { Dialog } from "@headlessui/react";
import { gallery } from "data/gallery";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
    HiArrowLeft,
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
    HiOutlineX,
} from "react-icons/hi";
import ImageView from "../imageView/ImageView";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

const GalleryGridView = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [width, setWidth] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [index, setIndex] = useState(0);
    const [lastChange, setLastChange] = useState(0);

    const currentIsFirst = index === 0;
    const currentIsLast = index === gallery.length - 1;

    const changeIndex = (delta: number) => {
        let newIndex = index + delta;
        if (newIndex > gallery.length - 1) {
            newIndex = gallery.length - 1;
        } else if (newIndex < 0) {
            newIndex = 0;
        }
        setIndex(newIndex);
        if (newIndex !== index) setLastChange(delta);
    };

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            const { code } = e;
            const rightKey = "ArrowRight";
            const leftKey = "ArrowLeft";

            if (code === rightKey) changeIndex(1);
            else if (code === leftKey) changeIndex(-1);
        };

        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, index]);

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

            setWindowWidth(ww);
            setWidth(w);
            setHeight(h);
        };

        image.addEventListener("load", setDimensions);
        window.addEventListener("resize", setDimensions);

        image.src = gallery[index];

        return () => {
            image.removeEventListener("load", setDimensions);
            window.addEventListener("resize", setDimensions);
        };
    }, [index]);

    return (
        <div className="flex items-center justify-center bg-white">
            <div className="flex flex-col items-center max-w-[80rem] w-full mx-6 md:mx-10 my-8">
                <div className="grid grid-cols-2 gap-6 my-8 md:grid-cols-3">
                    {gallery.map((src, i) => (
                        <ImageView
                            src={src}
                            key={i}
                            onClick={() => {
                                setIndex(i);
                                setIsOpen(true);
                            }}
                        />
                    ))}
                </div>
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} static>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50"
                                transition={{
                                    duration: 0.2,
                                }}
                            >
                                <div className="fixed inset-0 flex items-center justify-center bg-black">
                                    <AnimatePresence>
                                        <motion.img
                                            className="fixed"
                                            key={gallery[index]}
                                            transition={{
                                                duration: 0.25,
                                            }}
                                            variants={{
                                                initial: {
                                                    opacity: 0,
                                                },
                                                animate: {
                                                    x: 0,
                                                    width,
                                                    height,
                                                    opacity: 1,
                                                },
                                                exit: {
                                                    opacity: 0,
                                                },
                                            }}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            src={gallery[index]}
                                            drag="x"
                                            dragConstraints={{
                                                left: 0,
                                                right: 0,
                                            }}
                                            dragElastic={1}
                                            onDragEnd={(
                                                e,
                                                { offset, velocity }
                                            ) => {
                                                const swipe = swipePower(
                                                    offset.x,
                                                    velocity.x
                                                );

                                                if (
                                                    swipe <
                                                    -swipeConfidenceThreshold
                                                ) {
                                                    changeIndex(1);
                                                } else if (
                                                    swipe >
                                                    swipeConfidenceThreshold
                                                ) {
                                                    changeIndex(-1);
                                                }
                                            }}
                                        />
                                    </AnimatePresence>
                                </div>
                                <button
                                    className="fixed flex items-center justify-center w-12 h-12 text-4xl text-gray-300 bg-gray-500 rounded-full bg-opacity-[0] hover:bg-opacity-30 active:bg-opacity-60 top-2 left-4 transition-colors outline-none"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <HiOutlineX />
                                </button>
                                <button
                                    className="fixed flex items-center justify-center w-12 h-12 text-4xl text-gray-300 bg-gray-500 rounded-full bg-opacity-[0] hover:bg-opacity-30 active:bg-opacity-60 top-1/2 -translate-y-1/2 transform left-4 transition-colors outline-none disabled:hidden"
                                    disabled={currentIsFirst}
                                    onClick={() => changeIndex(-1)}
                                >
                                    <HiOutlineChevronLeft />
                                </button>
                                <button
                                    className="fixed flex items-center justify-center w-12 h-12 text-4xl text-gray-300 bg-gray-500 rounded-full bg-opacity-[0] hover:bg-opacity-30 active:bg-opacity-60 top-1/2 -translate-y-1/2 transform right-4 transition-colors outline-none disabled:hidden"
                                    disabled={currentIsLast}
                                    onClick={() => changeIndex(1)}
                                >
                                    <HiOutlineChevronRight />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Dialog>
            </div>
        </div>
    );
};

export default GalleryGridView;
