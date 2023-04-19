import { defineField, defineType } from "sanity";

const timeline = defineType({
    name: "timeline",
    title: "Timeline",
    type: "document",
    fields: [
        defineField({
            name: "cats",
            title: "Cat(s)",
            type: "array",
            of: [{ type: "reference", to: [{ type: "cat" }] }],
        }),
        defineField({
            name: "action",
            title: "Action",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "date",
            title: "Date",
            type: "date",
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: {
            subtitle: "action",
            cat0: "cats.0.name",
            cat1: "cats.1.name",
            cat2: "cats.2.name",
            cat3: "cats.3.name",
            cat4: "cats.4.name",
            cat5: "cats.5.name",
            date: "date",
        },
        prepare({ date, subtitle, cat0, cat1, cat2, cat3, cat4, cat5 }) {
            const title = [cat0, cat1, cat2, cat3, cat4, cat5]
                .filter(Boolean)
                .join(", ");
            return {
                title: date,
                subtitle: `${title} ${subtitle}`,
            };
        },
    },
});

export default timeline;
