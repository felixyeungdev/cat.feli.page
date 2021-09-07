import LinkButton from "components/LinkButton";
import MeetTheCats from "components/meetTheCats/MeetTheCats";
import React from "react";

const HomePage = () => {
    return (
        <>
            <h1></h1>
            <MeetTheCats />
            <div className="flex justify-center mt-16">
                <LinkButton href="/timeline">View Timeline</LinkButton>
            </div>
        </>
    );
};

export default HomePage;
