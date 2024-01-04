import { NextResponse } from "next/server";
import { getAllCats } from "~/lib/cms/queries";
import { CatsDatasetItem } from "./schema";

// modified from https://www.sanity.io/schemas/portable-text-to-plain-text-cc845843
function blocksToText(blocks: any) {
    return blocks
        .map((block) => {
            if (block._type !== "block" || !block.children) return "";
            return block.children.map((child) => child.text).join("");
        })
        .join("\n\n");
}

export const GET = async (request: Request) => {
    const cats = await getAllCats();

    return NextResponse.json(
        cats.map((cat) => {
            return {
                objectID: cat.slug,
                id: cat.slug,
                name: cat.name,
                avatar_url: cat.avatar.url,
                favourite_toys: cat.favouriteToys.map((toy) => toy.name),
                gender: cat.gender,
                adopted: cat.adopted,
                biography: blocksToText(cat.biography),
                date_of_birth: cat.dateOfBirth,
                date_of_death: cat.dateOfDeath,
            } satisfies CatsDatasetItem;
        }),
    );
};
