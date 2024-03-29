"use client";

import { Dialog } from "@headlessui/react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import Image from "next/image";
import React, { FC, useCallback, useEffect } from "react";
import { Button } from "react-aria-components";
import { HiArrowLeft, HiArrowRight, HiX } from "react-icons/hi";
import { GalleryItem } from "~/lib/cms/types";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

type Direction = "left" | "right";

const defaultImageDescription = "Image of cat(s)";

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

    const next = useCallback(() => {
        setImageIndex((prev) => (prev + 1) % gallery.length);
        setDirection("right");
    }, [gallery.length]);

    const prev = useCallback(() => {
        setImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
        setDirection("left");
    }, [gallery.length]);

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
    }, [next, prev]);

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
                                    alt={description ?? defaultImageDescription}
                                    title={
                                        description ?? defaultImageDescription
                                    }
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
                            className="fixed inset-0 z-50"
                            as={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                backgroundColor: `${currentImage.image.metadata.palette.darkMuted.background}EE`,
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 0.15,
                                ease: "easeInOut",
                            }}
                        >
                            <div className="absolute z-20 top-8 right-8">
                                <Button
                                    className="p-2 transition-colors rounded-full bg-white/50 hover:bg-white"
                                    onPress={closeImage}
                                >
                                    <HiX className="text-3xl" />
                                </Button>
                            </div>
                            <div className="absolute inset-y-0 left-0 z-10 items-center hidden p-8 cursor-pointer md:flex">
                                <Button
                                    className="p-2 transition-colors rounded-full bg-white/50 hover:bg-white"
                                    onPress={prev}
                                >
                                    <HiArrowLeft className="text-3xl" />
                                </Button>
                            </div>
                            <div className="absolute inset-y-0 right-0 z-10 items-center hidden p-8 cursor-pointer md:flex">
                                <Button
                                    className="p-2 transition-colors rounded-full bg-white/50 hover:bg-white"
                                    onPress={next}
                                >
                                    <HiArrowRight className="text-3xl" />
                                </Button>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 z-10 items-center p-8 cursor-pointer flex justify-center">
                                <span className="bg-black/75 px-2 py-1 rounded text-white">
                                    {currentImage.description}
                                </span>
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
                                    alt={
                                        currentImage.description ??
                                        defaultImageDescription
                                    }
                                    title={
                                        currentImage.description ??
                                        defaultImageDescription
                                    }
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
