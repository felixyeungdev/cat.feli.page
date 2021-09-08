export interface CatData {
    name: string;
    avatar: string;
    birthday: string;
    dateOfDeath?: string;
    weight: {
        date: string;
        value: number;
    }[];
    description: string;
    meetTheCats: boolean;
    favouriteToys: string[];
    adopted: boolean;
    gender: "male" | "female";
}

const cats: {
    sesame: CatData;
    shiba: CatData;
    simba: CatData;
    caramel: CatData;
    [key: string]: CatData;
} = {
    sesame: {
        name: "Sesame",
        avatar: "/assets/images/sesame.jpg",
        birthday: new Date("2020-06-01").toISOString(),
        weight: [{ date: new Date("2021-09-05").toISOString(), value: 3.42 }],
        description:
            "This is Sesame, he's a cat. He loves jumping around, bouncing through furniture. He'll jump on you when you're about to fall asleep, causing you to wake up. He climbs walls, and jumps off, smashing into things. He meows loudly when you're sleeping, and wake you up. He walks across the keyboard, causing me to type gibberish. He'll also nibble at your fingers. He's an idiot, but we love him.",
        meetTheCats: true,
        adopted: true,
        favouriteToys: ["Laser Pointer", "Table Tennis Ball"],
        gender: "male",
    },
    shiba: {
        name: "Shiba",
        avatar: "/assets/images/shiba.jpg",
        birthday: new Date("2020-07-01").toISOString(),
        weight: [{ date: new Date("2021-09-05").toISOString(), value: 5.08 }],
        description:
            "This is Shiba, he's a cat. He loves eating, like a lot. He is rather playful. He'll play with anything, a ball, a string, a piece of string, a ball of string, a piece of string tied to a ball of string. He is happy-go-lucky, and rarely ever has a bad mood. Shiba loves hiding in boxes, and under things. He is a very good pet, and he's amazing.",
        meetTheCats: true,
        adopted: true,
        favouriteToys: ["Stick", "Feathers on a Stick", "Fish"],
        gender: "male",
    },
    simba: {
        name: "Simba",
        avatar: "/assets/images/simba.jpg",
        birthday: new Date("2020-07-15").toISOString(),
        weight: [{ date: new Date("2021-09-05").toISOString(), value: 4.06 }],
        description:
            "This is Simba, he's a cat. He enjoys sleeping, and he likes to nap. He likes being scratched, and will purr a lot. He acts a little dumb, but he's not. Simba is loving, and very lazy. He'll follow you into the bathroom, and into your kitchen. He hates being picked up. He rarely ever bites, only when he bites really hard. Simba is part [a], and part [b]. Overall, Simba is a great cat, He'll keep you warm at night.",
        meetTheCats: true,
        adopted: true,
        favouriteToys: ["Laser Pointer"],
        gender: "male",
    },
    caramel: {
        name: "Caramel",
        avatar: "/assets/images/caramel.jpg",
        birthday: new Date("2020-06-01").toISOString(),
        dateOfDeath: new Date("2020-09-11").toISOString(),
        weight: [{ date: new Date("2021-09-05").toISOString(), value: 4.06 }],
        description:
            " This is Caramel, she's a cat. She died a while ago, we miss her a lot. R.I.P. Caramel was a pale yellow, amber and black cat. She was very young, and very playful. She used to be very happy, until her disease caught onto her. She lost her battle, and is now forever asleep. Caramel was my cat, and we miss her very much.",
        meetTheCats: false,
        adopted: true,
        favouriteToys: ["Laser Pointer"],
        gender: "female",
    },
};

export default cats;
