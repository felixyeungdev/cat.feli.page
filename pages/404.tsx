/* eslint-disable @next/next/no-img-element */
import LinkButton from "components/common/LinkButton";
import PageHeadFrag from "components/common/PageHeadFrag";
import Typography from "components/common/Typography";
import PurpleToWhite from "components/design/curves/PurpleToWhite";
import WhiteToBlue from "components/design/curves/WhiteToBlue";
import React from "react";
import { HiOutlineExclamation } from "react-icons/hi";

const ComingSoonPage = () => {
    return (
        <>
            <PageHeadFrag title="Not Found" />
            <WhiteToBlue />
            <div className="flex items-center justify-center bg-gradient-to-b from-blue-600 to-purple-600">
                <div className="flex flex-col items-center text-gray-50 max-w-[80rem] w-full mx-6 md:mx-10">
                    <div className="w-full max-w-sm mb-6">
                        <div
                            style={{
                                borderRadius:
                                    "70% 30% 61% 39% / 53% 69% 31% 47%",
                            }}
                            className="p-8 bg-white shadow-xl"
                        >
                            <img
                                src="/assets/images/undraw_page_not_found_su7k.svg"
                                alt="404 Image"
                            />
                        </div>
                    </div>
                    <Typography.h1>
                        <span className="flex items-center space-x-3">
                            <HiOutlineExclamation />
                            <span>Not Found</span>
                            <HiOutlineExclamation />
                        </span>
                    </Typography.h1>
                    <div className="mt-8">
                        <LinkButton href="/">Home</LinkButton>
                    </div>
                </div>
            </div>
            <PurpleToWhite />
        </>
    );
};

export default ComingSoonPage;
