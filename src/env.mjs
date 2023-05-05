// modified from create-t3-app src/env.mjs

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */

export const env = createEnv({
    server: {
        SANITY_API_READ_TOKEN: z.string().min(1),
        NODE_ENV: z.enum(["development", "production", "test"]),
    },
    client: {
        NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
        NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
        NEXT_PUBLIC_SANITY_API_VERSION: z.string().min(1),
        NEXT_PUBLIC_SANITY_PROJECT_TITLE: z.string().min(1),
    },
    runtimeEnv: {
        SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_SANITY_PROJECT_ID:
            process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
        NEXT_PUBLIC_SANITY_API_VERSION:
            process.env.NEXT_PUBLIC_SANITY_API_VERSION,
        NEXT_PUBLIC_SANITY_PROJECT_TITLE:
            process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE,
    },
});
