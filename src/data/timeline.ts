const timeline = [
    {
        date: new Date("2020-06-01").toISOString(),
        title: "Sesame and Caramel were born",
    },
    {
        date: new Date("2020-07-01").toISOString(),
        title: "Shiba was born",
    },
    {
        date: new Date("2020-07-15").toISOString(),
        title: "Simba was born",
    },
    {
        date: new Date("2020-08-07").toISOString(),
        title: "Sesame and Caramel were adopted by us",
    },
    {
        date: new Date("2020-08-09").toISOString(),
        title: "Shiba and Simba were adopted by us",
    },
    {
        date: new Date("2020-09-11").toISOString(),
        title: "Caramel sadly died due to birth defects",
    },
    {
        date: new Date("2020-09-11").toISOString(),
        title: "Sesame finds his way to the top of the shelves",
    },
    {
        date: new Date("2020-10-02").toISOString(),
        title: "DIY Cat Pole made",
    },
    {
        date: new Date("2020-10-09").toISOString(),
        title: "Sesame tip toes on the cat pole",
    },
    {
        date: new Date("2020-10-09").toISOString(),
        title: "Sesame parkour up to a loft bed",
    },
    {
        date: new Date("2020-10-11").toISOString(),
        title: "Shiba learns that a stick is fun to play with",
    },
    {
        date: new Date("2020-10-15").toISOString(),
        title: "Shiba tip toes on the cat pole",
    },
    {
        date: new Date("2020-10-17").toISOString(),
        title: "Sesame and Shiba finds hunting Fish thrilling",
    },
    {
        date: new Date("2020-10-17").toISOString(),
        title: "Simba got a taste of Cat Grass and loved it",
    },
    {
        date: new Date("2020-12-03").toISOString(),
        title: "Sesame, Shiba and Simba formed a team and knocked over a chair",
    },
    {
        date: new Date("2020-12-29").toISOString(),
        title: "Shiba likes Feather on a Stick a lot",
    },
    {
        date: new Date("2020-12-29").toISOString(),
        title: "Sesame, Shiba and Simba finds joy in hiding in bags",
    },
    {
        date: new Date("2021-03-07").toISOString(),
        title: "Shiba gets neutered",
    },
    {
        date: new Date("2021-03-28").toISOString(),
        title: "Sesame and Simba get neutered",
    },
    {
        date: new Date("2021-05-12").toISOString(),
        title: "Sesame jumps 2m high",
    },
    {
        date: new Date("2021-05-25").toISOString(),
        title: "Sesame does a pull-up",
    },
    {
        date: new Date("2021-05-25").toISOString(),
        title: "Sesame finds his way to top of a door",
    },
]
    .sort((a, b) => {
        const da = new Date(a.date).getTime();
        const db = new Date(b.date).getTime();
        if (da > db) return 1;
        if (da < db) return -1;
        return 0;
    })
    .reverse();

export default timeline;
