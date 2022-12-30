import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="flex justify-center py-8 bg-white ring-2 ring-gray-200 ring-inset">
            <div className="max-w-[80rem] md:mx-8 mx-6 flex justify-center w-full">
                <div className="text-xs">
                    <div>
                        Copyright © 2022{" "}
                        <a
                            href="https://felixyeung.com"
                            target="_blank"
                            className="transition-colors hover:text-indigo-600"
                            rel="noreferrer"
                        >
                            Felix Yeung
                        </a>
                        . All rights reserved.
                    </div>
                    <div>
                        <Link
                            href="/credits"
                            className="transition-colors hover:text-indigo-600"
                        >
                            Site Credits
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
