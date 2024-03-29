import dayjs from "dayjs";

export const formatAge = (date: string) => {
    const age = dayjs().diff(date, "years");
    const s = addS(age);
    return `${age} year${s} old`;
};

export const addS = (value: number) => (value > 1 || value === 0 ? "s" : "");
