import { visionTool } from "@sanity/vision";
import { defineConfig, isDev } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";
import { env } from "./src/env.mjs";

const devOnlyPlugins = [];

export default defineConfig({
    name: "default",
    basePath: "/studio",
    title: env.NEXT_PUBLIC_SANITY_PROJECT_TITLE,

    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,

    plugins: [deskTool(), visionTool(), ...(isDev ? devOnlyPlugins : [])],

    schema: {
        types: schemaTypes,
    },
});
