import LinkButton from "components/common/LinkButton";
import BlueToWhite from "components/design/curves/BlueToWhite";
import PurpleToBlue from "components/design/curves/PurpleToBlue";
import WhiteToBlue from "components/design/curves/WhiteToBlue";
import MeetTheCats from "components/pages/home/meetTheCats/MeetTheCats";
import ViewTimeline from "components/pages/home/viewTimeline/ViewTimeline";
import React from "react";

const HomePage = () => {
    return (
        <>
            <h1></h1>
            <WhiteToBlue />
            <MeetTheCats />
            <PurpleToBlue />
            <ViewTimeline />
            <BlueToWhite />
        </>
    );
};

export default HomePage;
