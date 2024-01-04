import { groq } from "next-sanity";
import { client } from "./client";
import { catFields, galleryItemFields, timelineFields } from "./fields";
import { catSchema, catsSchema, gallerySchema, timelineSchema } from "./schema";

export const getAllCats = async () => {
    const data = await client.fetch(
        groq`*[_type == "cat"]{
          ${catFields}
        }
        `,
    );

    return catsSchema.parse(data);
};

export const getCat = async (slug: string) => {
    const data = await client.fetch(
        groq`*[_type == "cat" && slug.current == $slug][0]{
          ${catFields}
        }
        `,
        { slug },
    );

    return catSchema.parse(data);
};

export const getAllTimelineEvents = async () => {
    const data = await client.fetch(
        groq`*[_type == "timeline"] | order(date desc){
          ${timelineFields}
        }
        `,
    );

    return timelineSchema.parse(data);
};

export const getAllGalleryItems = async () => {
    const data = await client.fetch(
        groq`*[_type == "gallery"] | order(date desc){
          ${galleryItemFields}
        }
        `,
    );

    return gallerySchema.parse(data);
};
