import React from "react";

const Footer = () => {
    return (
        <div className="flex justify-center py-8 bg-white ring-2 ring-gray-200">
            <div className="max-w-[80rem] md:mx-8 mx-6 flex justify-center w-full">
                <div>
                    Copyright © 2021{" "}
                    <a
                        href="https://felixyeung.com"
                        target="_blank"
                        className="transition-colors hover:text-indigo-600"
                    >
                        Felix Yeung
                    </a>
                    . All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default Footer;
