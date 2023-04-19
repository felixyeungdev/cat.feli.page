import { defineField, defineType } from "sanity";

const toy = defineType({
    name: "toy",
    title: "Toy",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            validation: (rule) => rule.required(),
            options: {
                source: "name",
                maxLength: 96,
            },
        }),
    ],
});

export default toy;
