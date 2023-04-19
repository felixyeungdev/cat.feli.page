import { GetStaticProps, NextPage } from "next";
import PageTitle from "~/components/common/PageTitle";
import BlueToWhite from "~/components/design/curves/BlueToWhite";
import PurpleToBlue from "~/components/design/curves/PurpleToBlue";
import WhiteToBlue from "~/components/design/curves/WhiteToBlue";
import FavouriteToys from "~/components/pages/home/favouriteToys/FavouriteToys";
import MeetTheCats from "~/components/pages/home/meetTheCats/MeetTheCats";
import ViewTimeline from "~/components/pages/home/viewTimeline/ViewTimeline";
import { Cat, getAllCats } from "~/lib/sanity.client";

interface Props {
    cats: Cat[];
}

const HomePage: NextPage<Props> = ({ cats }) => {
    return (
        <>
            <PageTitle>Welcome</PageTitle>
            <WhiteToBlue />
            <MeetTheCats cats={cats} />
            <PurpleToBlue />
            <ViewTimeline />
            <BlueToWhite />
            <FavouriteToys />
        </>
    );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const cats = await getAllCats();
    return {
        props: { cats },
        revalidate: 1,
    };
};

export default HomePage;
