import Link from "next/link";

import { IconType } from "react-icons/lib";
import SiteIcon from "./Icon";
import { Search } from "./Search";

const AppBarNavLink: React.FC<{
    Icon?: IconType;
    href: string;
    children: React.ReactNode;
}> = ({ children, Icon, href }) => {
    return (
        <Link href={href} className="text-indigo-600">
            {children}
        </Link>
    );
};

const AppBar: React.FC = () => {
    return (
        <nav className="bg-opacity-60 min-h-[4rem] sticky top-0 backdrop-filter backdrop-blur bg-white z-50 ring-2 ring-gray-200 ring-opacity-90 flex justify-center">
            <div className="max-w-[80rem] md:mx-8 mx-6 flex gap-6 justify-between w-full">
                <div className="grow">
                    <Link
                        href="/"
                        className="flex items-center space-x-3 min-h-[4rem] text-indigo-600"
                    >
                        <SiteIcon />
                        <span className="text-xl font-bold font-display">
                            Cats
                        </span>
                    </Link>
                </div>
                <div className="flex items-center space-x-2 font-medium">
                    <AppBarNavLink href="/gallery">Gallery</AppBarNavLink>
                </div>
                <Search />
            </div>
        </nav>
    );
};

export default AppBar;
