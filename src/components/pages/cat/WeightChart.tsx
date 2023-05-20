"use client";

import {
    Chart as ChartJS,
    LineElement,
    LinearScale,
    PointElement,
    TimeScale,
    Tooltip,
} from "chart.js";
import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";
import dayjs from "dayjs";
import { FC } from "react";
import { Line } from "react-chartjs-2";
import { Measurement } from "~/lib/cms/schema";

ChartJS.register(LinearScale, PointElement, LineElement, TimeScale, Tooltip);

const WeightChart: FC<{
    measurements: Measurement[];
}> = ({ measurements }) => {
    return (
        <Line
            options={{
                responsive: true,
                normalized: true,
                scales: {
                    x: {
                        type: "time",
                        adapters: {
                            date: dayjs,
                        },
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            }}
            data={{
                datasets: [
                    {
                        label: "Weight",
                        data: measurements
                            .sort(
                                (a, b) =>
                                    new Date(a.date).getTime() -
                                    new Date(b.date).getTime()
                            )
                            .map((measurement) => ({
                                x: measurement.date,
                                y: measurement.value,
                            })),
                        backgroundColor: "rgb(37 99 235)",
                        borderColor: "rgb(30 64 175)",
                    },
                ],
            }}
        />
    );
};

export default WeightChart;
