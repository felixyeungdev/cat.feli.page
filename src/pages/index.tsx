import { GetStaticProps } from "next";
import PageTitle from "~/components/common/PageTitle";
import BlueToWhite from "~/components/design/curves/BlueToWhite";
import PurpleToBlue from "~/components/design/curves/PurpleToBlue";
import WhiteToBlue from "~/components/design/curves/WhiteToBlue";
import FavouriteToys from "~/components/pages/home/favouriteToys/FavouriteToys";
import MeetTheCats from "~/components/pages/home/meetTheCats/MeetTheCats";
import ViewTimeline from "~/components/pages/home/viewTimeline/ViewTimeline";

const HomePage = () => {
    return (
        <>
            <PageTitle>Welcome</PageTitle>
            <WhiteToBlue />
            <MeetTheCats />
            <PurpleToBlue />
            <ViewTimeline />
            <BlueToWhite />
            <FavouriteToys />
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    console.log({ data: null });
    return {
        props: {},
        revalidate: 1,
    };
};

export default HomePage;
