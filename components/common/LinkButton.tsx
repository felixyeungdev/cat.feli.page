import Link from "next/link";
import React from "react";

interface Props {
    href: string;
}

const LinkButton: React.FC<Props> = ({ href, children }) => {
    return (
        <Link href={href}>
            <a className="inline-block py-3 px-8 bg-black text-white text-lg rounded-md hover:shadow-md hover:bg-opacity-80 active:bg-opacity-90 transition">
                {children}
            </a>
        </Link>
    );
};

export default LinkButton;
