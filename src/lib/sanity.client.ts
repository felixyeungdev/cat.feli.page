import { createClient, groq } from "next-sanity";
import { z } from "zod";
import { env } from "~/env.mjs";

export const client = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn: env.NODE_ENV === "production",
});

const imageAssetFields = groq`
    _id,
    url,
    metadata {
        dimensions,
        palette,
        lqip
    }
`;

const imageAssetSchema = z.object({
    _id: z.string(),
    url: z.string(),
    metadata: z.object({
        dimensions: z.object({
            aspectRatio: z.number(),
            height: z.number(),
            width: z.number(),
        }),
        palette: z.object({}),
        lqip: z.string(),
    }),
});

const catFields = groq`
  name,
  "slug": slug.current,
  "avatar": avatar.asset->{
    ${imageAssetFields}
  },
  favouriteToys[]->{name, "slug": slug.current},
  biography,
  measurements,
  gender,
  adopted,
  dateOfBirth,
  dateOfDeath,
  showInMeetTheCats,
`;

const catSchema = z.object({
    name: z.string(),
    slug: z.string(),
    avatar: imageAssetSchema,
    favouriteToys: z.array(
        z.object({
            name: z.string(),
            slug: z.string(),
        })
    ),
    gender: z.string(),
    adopted: z.boolean(),
    biography: z.any(),
    measurements: z.array(
        z.object({
            _key: z.string(),
            value: z.number(),
            date: z.string(),
        })
    ),
    dateOfBirth: z.string(),
    dateOfDeath: z.string().nullable(),
    showInMeetTheCats: z.boolean(),
});

export type Cat = z.infer<typeof catSchema>;

const timelineFields = groq`
    cats[]->{name, "slug": slug.current},
    action,
    date,
`;

const timelineSchema = z.object({
    cats: z
        .array(
            z.object({
                name: z.string(),
                slug: z.string(),
            })
        )
        .nullable()
        .transform((cats) => cats ?? []),
    action: z.string(),
    date: z.string(),
});

export type Timeline = z.infer<typeof timelineSchema>;

const galleryItemFields = groq`
    cats[]->{name, "slug": slug.current},
    "image": image.asset->{
        ${imageAssetFields}
    },
    description,
    date,
`;

const galleryItemSchema = z.object({
    cats: z
        .array(
            z.object({
                name: z.string(),
                slug: z.string(),
            })
        )
        .nullable()
        .transform((cats) => cats ?? []),
    image: imageAssetSchema,
    description: z.string().nullable(),
    date: z.string().nullable(),
});

export type GalleryItem = z.infer<typeof galleryItemSchema>;

export const getAllCats = async () => {
    const data = await client.fetch(
        groq`*[_type == "cat"]{
          ${catFields}
        }
        `
    );

    return z.array(catSchema).parse(data);
};

export const getCat = async (slug: string) => {
    const data = await client.fetch(
        groq`*[_type == "cat" && slug.current == $slug][0]{
          ${catFields}
        }
        `,
        { slug }
    );

    return catSchema.parse(data);
};

export const getAllTimelineEvents = async () => {
    const data = await client.fetch(
        groq`*[_type == "timeline"] | order(date desc){
          ${timelineFields}
        }
        `
    );

    return z.array(timelineSchema).parse(data);
};

export const getAllGalleryItems = async () => {
    const data = await client.fetch(
        groq`*[_type == "gallery"] | order(date desc){
          ${galleryItemFields}
        }
        `
    );

    return z.array(galleryItemSchema).parse(data);
};
