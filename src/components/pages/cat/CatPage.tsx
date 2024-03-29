/* eslint-disable @next/next/no-img-element */
import { PortableText } from "@portabletext/react";
import { NextPage } from "next";
import PageHeadFrag from "~/components/common/PageHeadFrag";
import Typography from "~/components/common/Typography";
import DataTile from "~/components/pages/cat/DataTile";

import { FaBirthdayCake } from "react-icons/fa";
import { HiEmojiSad, HiOutlineScale } from "react-icons/hi";
import { formatAge } from "~/utils/format";

import dayjs from "dayjs";
import dayjsAdvancedFormatPlugin from "dayjs/plugin/advancedFormat";
import dayjsLocalizedFormatPlugin from "dayjs/plugin/localizedFormat";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { Cat } from "~/lib/cms/types";
import WeightChart from "./WeightChart";
dayjs.extend(dayjsAdvancedFormatPlugin);
dayjs.extend(dayjsLocalizedFormatPlugin);

const CatPage: NextPage<{ cat: Cat }> = ({ cat }) => {
    const {
        name,
        avatar,
        dateOfBirth,
        dateOfDeath,
        measurements,
        biography,
        favouriteToys,
    } = cat;

    // sort weight by descending order and select first
    const latestWeight = measurements.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];

    const latestWeightDate = dayjs(latestWeight.date);

    const avatarDiv = (
        <div className="flex items-center justify-center rounded-full h-[13rem] w-[13rem] bg-gradient-to-r from-blue-600 to-purple-600">
            <Image
                className="w-48 h-48 rounded-full transition-transform group-hover:scale-110"
                src={avatar.url}
                alt={`Picture of ${name}`}
                blurDataURL={avatar.metadata.lqip}
                placeholder="blur"
                width={avatar.metadata.dimensions.width}
                height={avatar.metadata.dimensions.height}
            />
        </div>
    );

    const nameDiv = (
        <div className="mt-3 text-center">
            <Typography.h1>{name}</Typography.h1>
        </div>
    );

    const whoIsThisDiv = (
        <div className="mt-3 space-y-1 text-lg leading-7 text-center md:text-left">
            <Typography.h2>{"Who's this?"}</Typography.h2>
            <PortableText value={biography} />
        </div>
    );

    const dataDiv = (
        <div className="grid w-full max-w-md gap-3 mt-6">
            <DataTile
                Icon={FaBirthdayCake}
                label="Birthday"
                value={dayjs(dateOfBirth).format("LL")}
                hint={!dateOfDeath ? formatAge(dateOfBirth) : undefined}
            />
            {dateOfDeath && (
                <DataTile
                    Icon={HiEmojiSad}
                    label="Date of Death"
                    value={dayjs(dateOfDeath).format("LL")}
                    hint={`${dayjs(dateOfBirth).diff(
                        dateOfDeath,
                        "years"
                    )} years old`}
                />
            )}
            <Dialog>
                <DialogTrigger>
                    <DataTile
                        Icon={HiOutlineScale}
                        label="Weight"
                        value={`${latestWeight.value.toFixed(2)}kg`}
                        hint={`${latestWeightDate.format(
                            "LL"
                        )} (${latestWeightDate.format()})`}
                    />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{`${cat.name}'s weight history`}</DialogTitle>
                        <DialogDescription>
                            <WeightChart measurements={cat.measurements} />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );

    const favouriteToysDiv = (
        <div className="mt-8 text-center md:text-left">
            <Typography.h2>
                Favourite Toy{favouriteToys.length > 1 ? "s" : ""}
            </Typography.h2>
            <ul className="list-inside md:list-disc">
                {favouriteToys.map((toy, i) => (
                    <li key={toy.slug}>{toy.name}</li>
                ))}
            </ul>
        </div>
    );

    return (
        <>
            <PageHeadFrag title={name} />
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
                            <div className="flex justify-center">
                                {avatarDiv}
                            </div>
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
        </>
    );
};

export default CatPage;
