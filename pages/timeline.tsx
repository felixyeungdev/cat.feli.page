import PageTitle from "components/common/PageTitle";
import Typography from "components/common/Typography";
import timeline from "data/timeline";
import moment from "moment";
import Link from "next/link";
import React, { Fragment } from "react";

const Sesame = (
    <Link href="/about/sesame">
        <a>Sesame</a>
    </Link>
);
const Shiba = (
    <Link href="/about/shiba">
        <a>Shiba</a>
    </Link>
);
const Simba = (
    <Link href="/about/simba">
        <a>Simba</a>
    </Link>
);
const Caramel = (
    <Link href="/about/caramel">
        <a>Caramel</a>
    </Link>
);

const Year: React.FC<{ date: moment.Moment }> = ({ date }) => {
    return (
        <div className="grid-cols-12 gap-8 md:grid">
            <div className="sticky col-span-12 top-8 md:col-span-3">
                <div className="pt-6 text-4xl font-bold md:text-right">
                    {date.format("YYYY")}
                </div>
            </div>
            <div className="flex justify-center col-span-1">
                <div className="h-full max-w-[0.5rem] flex-grow bg-indigo-600"></div>
            </div>
            <div className="col-span-8"></div>
        </div>
    );
};

const Month: React.FC<{ date: moment.Moment }> = ({ date }) => {
    return (
        <div className="grid-cols-12 gap-8 md:grid">
            <div className="col-span-3">
                <div className="pt-3 text-2xl md:text-right">
                    {date.format("MMM")}
                </div>
            </div>
            <div className="flex justify-center col-span-1">
                <div className="h-full max-w-[0.5rem] flex-grow bg-indigo-600"></div>
            </div>
            <div className="col-span-8"></div>
        </div>
    );
};

const TimelineEvent: React.FC<{ date: moment.Moment; title: string }> = ({
    date,
    title,
}) => {
    return (
        <div className="grid-cols-12 gap-8 md:grid">
            <div className="col-span-3">
                <div className="text-sm font-light md:text-right pt-1.5">
                    <span className="hidden prose md:block">
                        {date.format("D")}
                    </span>
                    <span className="prose md:hidden">
                        {date.format("D MMM YYYY")}
                    </span>
                </div>
            </div>
            <div className="flex justify-center col-span-1">
                <div className="h-full max-w-[0.5rem] flex-grow bg-indigo-600"></div>
            </div>
            <div className="col-span-8 md:pt-1.5">
                <RichText text={title} />
            </div>
        </div>
    );
};

const RichText: React.FC<{ text: string }> = ({ text }) => {
    let parts: React.ReactNodeArray = text.split(" ");
    parts = parts.map((part) => (part === "Sesame" ? Sesame : part));
    parts = parts.map((part) => (part === "Shiba" ? Shiba : part));
    parts = parts.map((part) => (part === "Simba" ? Simba : part));
    parts = parts.map((part) => (part === "Caramel" ? Caramel : part));

    return (
        <div className="prose max-w-none">
            {parts.map((part, i) => (
                <>
                    {i === 0 ? "" : " "}
                    {part}
                </>
            ))}
        </div>
    );
};

const TimelinePage = () => {
    return (
        <>
            <PageTitle>Timeline</PageTitle>
            <div className="flex items-center justify-center bg-white">
                <div className="flex items-center max-w-[80rem] w-full mx-6 md:mx-10 my-8">
                    <div className="w-full">
                        {timeline.map(({ date: d, title }, i) => {
                            const date = moment(d);
                            const lastDate =
                                i - 1 >= 0
                                    ? moment(timeline[i - 1].date)
                                    : null;
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
                                    <TimelineEvent {...{ date, title }} />
                                </Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TimelinePage;
