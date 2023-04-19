import { defineField, defineType } from "sanity";

const cat = defineType({
    name: "cat",
    title: "Cat",
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
        defineField({
            name: "avatar",
            title: "Avatar",
            type: "image",
            validation: (rule) => rule.required(),
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "gender",
            title: "Gender",
            type: "string",
            validation: (rule) => rule.required(),
            options: {
                list: ["male", "female"],
            },
        }),
        defineField({
            name: "adopted",
            title: "Adopted",
            type: "boolean",
        }),
        defineField({
            name: "biography",
            title: "Bio",
            type: "array",
            validation: (rule) => rule.required(),
            of: [{ type: "block" }],
        }),
        defineField({
            name: "dateOfBirth",
            title: "Date of Birth",
            type: "date",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "favouriteToys",
            title: "Favourite Toys",
            type: "array",
            of: [{ type: "reference", to: [{ type: "toy" }] }],
        }),
        defineField({
            name: "measurements",
            title: "Measurements",
            type: "array",
            of: [
                defineField({
                    name: "weight",
                    title: "Weight",
                    type: "document",
                    validation: (rule) => rule.required(),
                    fields: [
                        defineField({
                            name: "value",
                            title: "Value",
                            type: "number",
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: "date",
                            title: "Date",
                            type: "date",
                            validation: (rule) => rule.required(),
                        }),
                    ],
                }),
            ],
        }),
        defineField({
            name: "dateOfDeath",
            title: "Date of Death",
            type: "date",
        }),
    ],
});

export default cat;
