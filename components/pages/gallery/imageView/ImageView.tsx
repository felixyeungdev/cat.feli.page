import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";

interface Props {
    src: string;
    onClick: () => void;
}

const ImageView: React.FC<Props> = ({ src, onClick }) => {
    return (
        <div className="flex justify-center">
            <img
                src={src}
                className="max-w-[20rem] w-full object-cover cursor-pointer"
                style={{ aspectRatio: "1/1" }}
                onClick={onClick}
            />
        </div>
    );
};

export default ImageView;
