import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons/lib";
import SiteIcon from "./Icon";

const AppBarNavLink: React.FC<{
    Icon?: IconType;
    href: string;
    children: React.ReactNode;
}> = ({ children, Icon, href }) => {
    return (
        <Link href={href}>
            <a className="text-indigo-600">{children}</a>
        </Link>
    );
};

const AppBar: React.FC = () => {
    return (
        <nav className="bg-opacity-60 min-h-[4rem] sticky top-0 backdrop-filter backdrop-blur bg-white z-50 ring-2 ring-gray-200 ring-opacity-90 flex justify-center">
            <div className="max-w-[80rem] md:mx-8 mx-6 flex justify-between w-full">
                <div>
                    <Link href="/">
                        <a className="flex items-center space-x-3 min-h-[4rem] text-indigo-600">
                            <SiteIcon />
                            <span className="text-xl font-bold">Cats</span>
                        </a>
                    </Link>
                </div>
                <div className="flex items-center space-x-2 font-medium">
                    <AppBarNavLink href="/gallery">Gallery</AppBarNavLink>
                </div>
            </div>
        </nav>
    );
};

export default AppBar;
