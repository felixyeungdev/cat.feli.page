import dayjs from "dayjs";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React, { FC, Fragment, ReactNode } from "react";
import PageTitle from "~/components/common/PageTitle";
import GreyToWhite from "~/components/design/wave/GreyToWhite";
import WhiteToGrey from "~/components/design/wave/WhiteToGrey";
import { getAllTimelineEvents } from "~/lib/cms/queries";
import { Cat, Timeline } from "~/lib/cms/types";

const Sesame = <Link href="/about/sesame">Sesame</Link>;
const Shiba = <Link href="/about/shiba">Shiba</Link>;
const Simba = <Link href="/about/simba">Simba</Link>;
const Caramel = <Link href="/about/caramel">Caramel</Link>;

const CatLink: FC<{
    cat: Pick<Cat, "name" | "slug">;
}> = ({ cat }) => {
    const { name, slug } = cat;
    return <Link href={`/about/${slug}`}>{name}</Link>;
};

const Year: React.FC<{ date: dayjs.Dayjs }> = ({ date }) => {
    return (
        <div className="grid-cols-12 gap-8 md:grid">
            <div className="sticky col-span-12 top-8 md:col-span-3">
                <div className="pt-6 text-4xl font-bold md:text-right">
                    {date.format("YYYY")}
                </div>
            </div>
            <div className="flex justify-center col-span-1">
                <div className="h-full max-w-[0.5rem] flex-grow bg-gradient-to-r from-blue-600 to bg-purple-600"></div>
            </div>
            <div className="col-span-8"></div>
        </div>
    );
};

const Month: React.FC<{ date: dayjs.Dayjs }> = ({ date }) => {
    return (
        <div className="grid-cols-12 gap-8 md:grid">
            <div className="col-span-3">
                <div className="pt-3 text-2xl md:text-right">
                    {date.format("MMM")}
                </div>
            </div>
            <div className="flex justify-center col-span-1">
                <div className="h-full max-w-[0.5rem] flex-grow bg-gradient-to-r from-blue-600 to bg-purple-600"></div>
            </div>
            <div className="col-span-8"></div>
        </div>
    );
};

const TimelineEvent: React.FC<{ date: dayjs.Dayjs; title: ReactNode }> = ({
    date,
    title,
}) => {
    return (
        <div className="grid-cols-12 gap-8 transition rounded-lg md:grid md:hover:shadow-md md:hover:bg-white group">
            <div className="col-span-3">
                <div className="text-sm font-light md:text-right pt-1.5 md:pb-1.5">
                    <span className="hidden prose md:block">
                        {date.format("D")}
                    </span>
                    <span className="prose md:hidden">
                        {date.format("D MMM YYYY")}
                    </span>
                </div>
            </div>
            <div className="flex justify-center col-span-1">
                <div className="h-full max-w-[0.5rem] flex-grow bg-gradient-to-r group-hover:scale-x-150 from-blue-600 to bg-purple-600 transition-transform"></div>
            </div>
            <div className="col-span-8 md:py-1.5 prose max-w-none">{title}</div>
        </div>
    );
};

interface Props {
    timeline: Timeline[];
}

const TimelinePage: NextPage<Props> = ({ timeline }) => {
    return (
        <>
            <PageTitle>Timeline</PageTitle>
            <WhiteToGrey />
            <div className="flex items-center justify-center">
                <div className="flex items-center max-w-[80rem] w-full mx-6 md:mx-10 my-8">
                    <div className="w-full">
                        <div className="hidden grid-cols-12 gap-8 md:grid min-h-[1rem]">
                            <div className="col-span-3"></div>
                            <div className="flex justify-center col-span-1">
                                <div className="h-full max-w-[0.5rem] flex-grow bg-gradient-to-r from-blue-600 to bg-purple-600 rounded-t-md"></div>
                            </div>
                            <div className="col-span-8"></div>
                        </div>
                        {timeline.map(({ date: d, action, cats }, i) => {
                            const date = dayjs(d);
                            const lastDate =
                                i - 1 >= 0 ? dayjs(timeline[i - 1].date) : null;
                            const renderYear =
                                lastDate?.format("YYYY") !==
                                date.format("YYYY");
                            const renderMonth =
                                lastDate?.format("YYYYMM") !==
                                date.format("YYYYMM");
                            return (
                                <Fragment key={i}>
                                    {renderYear && <Year {...{ date }} />}
                                    {renderMonth && <Month {...{ date }} />}
                                    <TimelineEvent
                                        {...{
                                            date,
                                            title: (
                                                <>
                                                    {cats.map((cat, index) => (
                                                        <>
                                                            <CatLink
                                                                key={cat.slug}
                                                                cat={cat}
                                                            />
                                                            {index <
                                                                cats.length -
                                                                    1 && (
                                                                <span>, </span>
                                                            )}
                                                        </>
                                                    ))}{" "}
                                                    {action}
                                                </>
                                            ),
                                        }}
                                    />
                                </Fragment>
                            );
                        })}
                        <div className="hidden grid-cols-12 gap-8 md:grid min-h-[1rem]">
                            <div className="col-span-3"></div>
                            <div className="flex justify-center col-span-1">
                                <div className="h-full max-w-[0.5rem] flex-grow bg-gradient-to-r from-blue-600 to bg-purple-600 rounded-b-md"></div>
                            </div>
                            <div className="col-span-8"></div>
                        </div>
                    </div>
                </div>
            </div>
            <GreyToWhite />
        </>
    );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const timeline = await getAllTimelineEvents();

    return {
        props: {
            timeline,
        },
    };
};

export default TimelinePage;
