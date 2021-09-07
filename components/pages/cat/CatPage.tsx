import Typography from "components/common/Typography";
import DataTile from "components/DataTile";
import cats, { CatData } from "data/cats";
import moment from "moment";
import { NextPage } from "next";
import React from "react";
import { FaBirthdayCake } from "react-icons/fa";
import { HiOutlineScale } from "react-icons/hi";

const CatPage: NextPage<{ cat: CatData }> = ({ cat }) => {
    const {
        name,
        avatar,
        birthday,
        dateOfDeath,
        weight,
        description,
        meetTheCats,
        favouriteToys,
        adopted,
    } = cat;

    const latestWeight = weight.sort((a, b) =>
        new Date(a.date) > new Date(b.date) ? 1 : 0
    )[0];

    const latestWeightDate = moment(latestWeight.date);

    const avatarDiv = (
        <div className="flex items-center justify-center rounded-full h-[13rem] w-[13rem] bg-gradient-to-r from-blue-600 to-purple-600">
            <img
                src={avatar}
                height={256}
                width={256}
                className="w-48 h-48 rounded-full shadow-md"
            />
        </div>
    );

    const nameDiv = (
        <div className="mt-3 text-center">
            <Typography.h1>{name}</Typography.h1>
        </div>
    );

    const whoIsThisDiv = (
        <div className="max-w-md mt-3 space-y-1 leading-7 text-center md:text-left">
            <Typography.h2>Who's this?</Typography.h2>
            <p>{description}</p>
        </div>
    );

    const dataDiv = (
        <div className="grid w-full max-w-md gap-3 mt-6">
            <DataTile
                Icon={FaBirthdayCake}
                label="Birthday"
                value={moment(birthday).format("LL")}
                hint={`${moment().diff(birthday, "years")} old`}
            />
            <DataTile
                Icon={HiOutlineScale}
                label="Weight"
                value={`${latestWeight.value.toFixed(2)}kg`}
                hint={`${latestWeightDate.format(
                    "LL"
                )} (${latestWeightDate.fromNow()})`}
            />
        </div>
    );

    const favouriteToysDiv = (
        <div className="mt-8 text-center md:text-left">
            <Typography.h2>
                Favourite Toy{favouriteToys.length > 1 ? "s" : ""}
            </Typography.h2>
            <ul>
                {favouriteToys.map((toy, i) => (
                    <li key={i}>{toy}</li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="flex justify-center">
            <div className="max-w-[80rem] w-full mx-6 md:mx-10">
                <div className="flex flex-col items-center py-16 md:hidden">
                    {avatarDiv}
                    {nameDiv}
                    {whoIsThisDiv}
                    {dataDiv}
                    {favouriteToysDiv}
                </div>
                <div className="hidden grid-cols-5 gap-16 py-8 md:grid">
                    <div className="col-span-2">
                        <div className="flex justify-center">{avatarDiv}</div>
                        {nameDiv}
                        {dataDiv}
                    </div>
                    <div className="col-span-3">
                        {whoIsThisDiv}
                        {favouriteToysDiv}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatPage;
