import { visionTool } from "@sanity/vision";
import { defineConfig, isDev } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";

const devOnlyPlugins = [];

export default defineConfig({
    name: "default",
    title: "Cats",

    projectId: "6e6fsg8r",
    dataset: "production",

    plugins: [deskTool(), visionTool(), ...(isDev ? devOnlyPlugins : [])],

    schema: {
        types: schemaTypes,
    },
});
