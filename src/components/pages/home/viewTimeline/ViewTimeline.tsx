import LinkButton from "~/components/common/LinkButton";
import React from "react";

const ViewTimeline = () => {
    return (
        <div className="flex justify-center py-16 bg-blue-600">
            <div className="max-w-[80rem] w-full mx-6 md:mx-10">
                <h2 className="text-4xl font-bold tracking-wide text-center text-gray-50">
                    They grow up so fast
                </h2>
                <h3 className="mt-3 text-2xl font-medium tracking-normal text-center text-gray-200">
                    We can barely keep track
                </h3>
                <div className="flex justify-center mt-8">
                    <LinkButton href="/timeline">View Timeline</LinkButton>
                </div>
            </div>
        </div>
    );
};

export default ViewTimeline;
