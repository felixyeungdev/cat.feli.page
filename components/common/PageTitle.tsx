import { motion } from "framer-motion";
import React from "react";

const PageTitle: React.FC = ({ children }) => {
    return (
        <div className="flex justify-center py-16 bg-white">
            <div className="max-w-[80rem] w-full mx-6 md:mx-10">
                <motion.h1
                    layoutId="PageTitle"
                    className="text-6xl font-black tracking-wide text-center text-gray-900"
                >
                    {children}
                </motion.h1>
            </div>
        </div>
    );
};

export default PageTitle;
