/* eslint-disable @next/next/no-img-element */
import { gallery } from "data/gallery";
import React, { useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { HiArrowLeft, HiArrowRight, HiX } from "react-icons/hi";
import { AnimatePresence, motion, Variants } from "framer-motion";

type Direction = "left" | "right";

const GalleryGridView = () => {
    const [open, setOpen] = React.useState(false);
    const [imageIndex, setImageIndex] = React.useState(5);
    const [direction, setDirection] = React.useState<Direction | null>("right");

    const openImage = (imageIndex: number) => {
        setImageIndex(imageIndex);
        setOpen(true);
        setDirection(null);
    };

    const closeImage = () => setOpen(false);

    const next = () => {
        setImageIndex((prev) => (prev + 1) % gallery.length);
        setDirection("right");
    };
    const prev = () => {
        setImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
        setDirection("left");
    };

    useEffect(() => {
        // support arrow keys
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowRight") {
                next();
            } else if (event.key === "ArrowLeft") {
                prev();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const toRight = direction === "right";

    return (
        <>
            <div className="bg-white">
                <div className="container grid grid-cols-2 px-3 mx-auto md:grid-cols-3">
                    {gallery.map((image, index) => {
                        return (
                            <div
                                key={image}
                                className="p-3 transition cursor-pointer hover:scale-105"
                                onClick={() => openImage(index)}
                            >
                                <img
                                    src={image}
                                    alt="image of cat(s)"
                                    className="object-cover aspect-square"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <Dialog open={open} onClose={() => setOpen(false)} static>
                        <Dialog.Panel
                            className="fixed inset-0 z-50 bg-black/90"
                            as={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 0.1,
                                ease: "easeInOut",
                            }}
                        >
                            <div className="absolute z-20 top-8 right-8">
                                <button
                                    className="p-2 transition-colors rounded-full bg-white/50 hover:bg-white"
                                    onClick={closeImage}
                                >
                                    <HiX className="text-4xl" />
                                </button>
                            </div>
                            <div className="absolute inset-0 z-10 flex items-center justify-between p-8">
                                <button
                                    className="p-2 transition-colors rounded-full bg-white/50 hover:bg-white"
                                    onClick={prev}
                                >
                                    <HiArrowLeft className="text-4xl" />
                                </button>
                                <button
                                    className="p-2 transition-colors rounded-full bg-white/50 hover:bg-white"
                                    onClick={next}
                                >
                                    <HiArrowRight className="text-4xl" />
                                </button>
                            </div>
                            <AnimatePresence custom={direction}>
                                <motion.img
                                    key={imageIndex}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    custom={direction}
                                    src={gallery[imageIndex]}
                                    alt="image of cat(s)"
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute object-contain w-full h-full aspect-square"
                                />
                            </AnimatePresence>
                        </Dialog.Panel>
                    </Dialog>
                )}
            </AnimatePresence>
        </>
    );
};

const variants: Variants = {
    enter: (direction: Direction) => ({
        x: direction === "right" ? "100%" : direction === "left" ? "-100%" : 0,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: Direction) => ({
        x: direction === "right" ? "-100%" : direction === "left" ? "100%" : 0,
        opacity: 0,
    }),
};

export default GalleryGridView;
