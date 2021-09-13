import cats from "data/cats";
import React from "react";
import Link from "next/link";
import { FaPaw } from "react-icons/fa";

interface Props {
    cat: string;
}

const SimpleCatCard: React.FC<Props> = ({ cat }) => {
    const catData = cats[cat];
    const { name, avatar, birthday } = catData;
    return (
        <div className="relative z-10 flex justify-around flex-grow transition-shadow bg-white shadow-xl md:mt-12 group rounded-xl md:block even:flex-row-reverse hover:shadow-2xl">
            <div className="flex items-center justify-center md:w-full md:absolute md:-top-12">
                <div className="w-32 h-32 my-6 overflow-hidden rounded-full shadow-md md:my-0">
                    <img
                        className="w-32 h-32 transition-transform group-hover:scale-110"
                        src={avatar}
                        width={96}
                        height={96}
                    />
                </div>
            </div>
            <div className="py-6 md:mt-20">
                <div className="mb-3 text-center">
                    <div className="text-base font-light">Meet</div>
                    <div className="text-2xl font-semibold">{name}</div>
                </div>
                <div className="flex justify-center md:mb-3">
                    <Link href={`/about/${cat}`}>
                        <a className="px-4 py-2 rounded-md bg-gradient-to-b from-blue-600 to-[#4338CA] text-gray-50 flex items-center space-x-2 hover:scale-105 active:scale-95 transition-transform group hover:shadow">
                            <FaPaw className="transition-transform group-hover:-rotate-6 group-active:rotate-6" />
                            <span>About</span>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SimpleCatCard;
