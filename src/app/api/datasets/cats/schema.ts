import { z } from "zod";

export const catsDatasetItemSchema = z.object({
    objectID: z.string(),
    id: z.string(),
    name: z.string(),
    avatar_url: z.string(),
    favourite_toys: z.array(z.string()),
    gender: z.string(),
    adopted: z.boolean(),
    biography: z.string(),
    date_of_birth: z.string().nullable(),
    date_of_death: z.string().nullable(),
});

export type CatsDatasetItem = z.infer<typeof catsDatasetItemSchema>;
