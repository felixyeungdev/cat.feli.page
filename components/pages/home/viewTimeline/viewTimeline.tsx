import LinkButton from "components/common/LinkButton";
import React from "react";

const ViewTimeline = () => {
    return (
        <div className="flex justify-center py-16 bg-blue-600">
            <LinkButton href="/timeline">View Timeline</LinkButton>
        </div>
    );
};

export default ViewTimeline;
