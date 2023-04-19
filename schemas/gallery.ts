import { defineField, defineType } from "sanity";

const gallery = defineType({
    name: "gallery",
    title: "Gallery",
    type: "document",
    fields: [
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            validation: (rule) => rule.required(),
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "cats",
            title: "Cat(s)",
            type: "array",
            of: [{ type: "reference", to: [{ type: "cat" }] }],
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "string",
        }),
        defineField({
            name: "date",
            title: "Date",
            type: "date",
        }),
    ],
});

export default gallery;
