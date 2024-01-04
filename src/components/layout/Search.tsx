"use client";

import { getAlgoliaResults } from "@algolia/autocomplete-js";
import algoliasearch from "algoliasearch/lite";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CatsDatasetItem } from "~/app/api/datasets/cats/schema";
import { env } from "~/env.mjs";
import { Autocomplete } from "../Autocomplete";

const searchClient = algoliasearch(
    env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
);

const CatsDatasetSearchHit = ({ item }: { item: CatsDatasetItem }) => {
    return (
        <div className="flex items-center gap-3">
            <div className="h-12 w-12 relative">
                <Image
                    className="w-48 h-48 rounded-full transition-transform group-hover:scale-110"
                    src={item.avatar_url}
                    alt={`Picture of ${item.name}`}
                    fill={true}
                />
            </div>
            <div className="flex flex-col gap-1">
                <strong className="font-display font-semibold text-lg">
                    {item.name}
                </strong>
            </div>
        </div>
    );
};

export const Search = () => {
    const router = useRouter();
    return (
        <>
            <Autocomplete
                className="flex items-center"
                openOnFocus
                getSources={({ query }) => [
                    {
                        sourceId: "cats",
                        getItems() {
                            return getAlgoliaResults({
                                searchClient,
                                queries: [
                                    {
                                        indexName:
                                            env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME,
                                        query,
                                    },
                                ],
                            });
                        },
                        onSelect({ item }) {
                            router.push(`/about/${item.id}`);
                        },
                        templates: {
                            item({ item, components }) {
                                return (
                                    <CatsDatasetSearchHit
                                        item={item as CatsDatasetItem}
                                    />
                                );
                            },
                        },
                    },
                ]}
            />
        </>
    );
};
