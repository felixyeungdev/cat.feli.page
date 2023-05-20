import { z } from "zod";

export const sanityImagePaletteSwatch = z.object({
    _type: z.literal("sanity.imagePaletteSwatch"),
    background: z.string(),
    foreground: z.string(),
    population: z.number(),
    title: z.string(),
});

export const sanityImagePalette = z.object({
    _type: z.literal("sanity.imagePalette"),
    darkMuted: sanityImagePaletteSwatch,
    darkVibrant: sanityImagePaletteSwatch,
    dominant: sanityImagePaletteSwatch,
    lightMuted: sanityImagePaletteSwatch,
    lightVibrant: sanityImagePaletteSwatch,
    muted: sanityImagePaletteSwatch,
    vibrant: sanityImagePaletteSwatch,
});

export const imageAssetSchema = z.object({
    _id: z.string(),
    url: z.string(),
    metadata: z.object({
        dimensions: z.object({
            aspectRatio: z.number(),
            height: z.number(),
            width: z.number(),
        }),
        palette: sanityImagePalette,
        lqip: z.string(),
    }),
});

export const measurementSchema = z.object({
    _key: z.string(),
    value: z.number(),
    date: z.string(),
});

export type Measurement = z.infer<typeof measurementSchema>;

export const catSchema = z.object({
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
    measurements: z.array(measurementSchema),
    dateOfBirth: z.string(),
    dateOfDeath: z.string().nullable(),
    showInMeetTheCats: z.boolean(),
});

export const catsSchema = z.array(catSchema);

export const timelineItemSchema = z.object({
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

export const timelineSchema = z.array(timelineItemSchema);

export const galleryItemSchema = z.object({
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

export const gallerySchema = z.array(galleryItemSchema);
