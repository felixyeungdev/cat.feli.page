import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useWindowSize } from "react-use";

interface Props {
    isLoading: boolean;
}

const Loading = ({ isLoading }: Props) => {
    const { width } = useWindowSize();
    // return <></>;
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-x-0 top-0 h-1 overflow-hidden scale-x-125 bg-opacity-25 pointer-events-none bg-feli"
                    style={{ zIndex: 999, maxWidth: width }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ paddingLeft: 0, paddingRight: 0 }}
                        animate={{
                            paddingLeft: [0, width / 4, width],
                            paddingRight: [width, width / 4, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "linear",
                        }}
                    >
                        <div
                            className="w-full bg-purple-600 bg-gradient-to-r from-blue-600 to"
                            style={{ height: 3 }}
                        ></div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loading;
