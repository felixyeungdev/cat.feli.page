interface CollageItem {
    date: Date;
    cats: {
        cat: string;
        url: string;
    }[];
}

const collage: CollageItem[] = [
    {
        date: new Date("2020-09-19"),
        cats: [
            {
                cat: "simba",
                url: "/assets/images/box-simba-20200919.jpg",
            },
            {
                cat: "sesame",
                url: "/assets/images/box-sesame-20200919.jpg",
            },
            {
                cat: "shiba",
                url: "/assets/images/box-shiba-20200919.png",
            },
        ],
    },
    {
        date: new Date("2021-08-28"),
        cats: [
            {
                cat: "simba",
                url: "/assets/images/box-simba-20210828.jpg",
            },
            {
                cat: "sesame",
                url: "/assets/images/box-sesame-20210828.jpg",
            },
            {
                cat: "shiba",
                url: "/assets/images/box-shiba-20210828.jpg",
            },
        ],
    },
];

export default collage;
