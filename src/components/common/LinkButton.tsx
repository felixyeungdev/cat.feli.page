import Link from "next/link";
import React from "react";

interface Props {
    href: string;
    children: React.ReactNode;
}

const LinkButton: React.FC<Props> = ({ href, children }) => {
    return (
        <Link
            href={href}
            className="inline-block px-8 py-3 text-lg text-white transition bg-black rounded-md hover:shadow-md hover:bg-opacity-80 active:bg-opacity-90"
        >
            {children}
        </Link>
    );
};

export default LinkButton;
