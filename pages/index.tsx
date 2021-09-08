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
            <div className="flex justify-center py-16 bg-white">
                <div className="max-w-[80rem] w-full mx-6 md:mx-10">
                    <h2 className="text-4xl font-bold tracking-wide text-center text-indigo-600 ">
                        Their Favourite Toys
                    </h2>
                    <img src="/assets/images/toys/toys.svg" />
                </div>
            </div>
        </>
    );
};

export default HomePage;
