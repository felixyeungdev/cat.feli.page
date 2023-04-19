import { createClient, groq } from "next-sanity";
import { z } from "zod";
import { env } from "~/env.mjs";

export const client = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn: env.NODE_ENV === "production",
});

const catFields = groq`
  name,
  "slug": slug.current,
  "avatar": avatar.asset->url,
  favouriteToys[]->{name, "slug": slug.current},
  biography,
  measurements,
  gender,
  adopted,
  dateOfBirth,
  dateOfDeath,
`;

const catSchema = z.object({
    name: z.string(),
    slug: z.string(),
    avatar: z.string(),
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
});

export type Cat = z.infer<typeof catSchema>;

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
