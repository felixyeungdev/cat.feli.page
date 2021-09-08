import BlueToWhite from "components/design/curves/BlueToWhite";
import PurpleToBlue from "components/design/curves/PurpleToBlue";
import WhiteToBlue from "components/design/curves/WhiteToBlue";
import FavouriteToys from "components/pages/home/favouriteToys/FavouriteToys";
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
            <FavouriteToys />
        </>
    );
};

export default HomePage;
