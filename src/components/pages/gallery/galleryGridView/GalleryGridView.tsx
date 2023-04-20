import { Dialog } from "@headlessui/react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import Image from "next/image";
import React, { FC, useEffect } from "react";
import { HiArrowLeft, HiArrowRight, HiX } from "react-icons/hi";
import { GalleryItem } from "~/lib/sanity.client";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

type Direction = "left" | "right";

const GalleryGridView: FC<{
    gallery: GalleryItem[];
}> = ({ gallery }) => {
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

    const currentImage = gallery[imageIndex];

    return (
        <>
            <div className="bg-white">
                <div className="container grid grid-cols-2 px-3 mx-auto md:grid-cols-3">
                    {gallery.map((galleryItem, index) => {
                        const { description, image } = galleryItem;
                        return (
                            <div
                                key={index}
                                className="p-3 transition cursor-pointer hover:scale-105"
                                onClick={() => openImage(index)}
                            >
                                <Image
                                    src={image.url}
                                    alt={description}
                                    title={description}
                                    className="object-cover aspect-square"
                                    loading="lazy"
                                    blurDataURL={image.metadata.lqip}
                                    placeholder="blur"
                                    width={image.metadata.dimensions.width}
                                    height={image.metadata.dimensions.height}
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
                                duration: 0.15,
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
                            <div
                                className="absolute inset-y-0 left-0 z-10 items-center hidden p-8 cursor-pointer md:flex"
                                onClick={prev}
                            >
                                <button
                                    className="p-2 transition-colors rounded-full bg-white/50 hover:bg-white"
                                    onClick={prev}
                                >
                                    <HiArrowLeft className="text-4xl" />
                                </button>
                            </div>
                            <div
                                className="absolute inset-y-0 right-0 z-10 items-center hidden p-8 cursor-pointer md:flex"
                                onClick={next}
                            >
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
                                    whileDrag="dragging"
                                    custom={direction}
                                    src={currentImage.image.url}
                                    alt={currentImage.description}
                                    title={currentImage.description}
                                    drag="x"
                                    dragConstraints={{
                                        left: 0,
                                        right: 0,
                                    }}
                                    dragElastic={1}
                                    onDragEnd={(_e, { offset, velocity }) => {
                                        const swipe = swipePower(
                                            offset.x,
                                            velocity.x
                                        );
                                        if (swipe < -swipeConfidenceThreshold)
                                            return next();
                                        if (swipe > swipeConfidenceThreshold)
                                            return prev();
                                    }}
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
        opacity: direction ? 0.5 : 1,
        scale: 0.5,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction: Direction) => ({
        x: direction === "right" ? "-100%" : direction === "left" ? "100%" : 0,
        opacity: direction ? 0.5 : 1,
        scale: 0.5,
    }),
    dragging: {
        scale: 0.9,
    },
};

export default GalleryGridView;
