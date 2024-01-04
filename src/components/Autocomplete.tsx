"use client";

// from https://www.algolia.com/doc/ui-libraries/autocomplete/integrations/using-react/

import type { BaseItem } from "@algolia/autocomplete-core";
import { autocomplete, AutocompleteOptions } from "@algolia/autocomplete-js";
import "@algolia/autocomplete-theme-classic";
import { createElement, Fragment, useEffect, useRef } from "react";
import { createRoot, Root } from "react-dom/client";

export function Autocomplete({
    className,
    ...props
}: Omit<AutocompleteOptions<BaseItem>, "container" | "renderer" | "render"> & {
    className?: string;
}) {
    const containerRef = useRef(null);
    const panelRootRef = useRef<Root | null>(null);
    const rootRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) {
            return undefined;
        }

        const search = autocomplete({
            container: containerRef.current,
            renderer: { createElement, Fragment, render: () => {} },
            render({ children }, root) {
                if (!panelRootRef.current || rootRef.current !== root) {
                    rootRef.current = root;

                    panelRootRef.current?.unmount();
                    panelRootRef.current = createRoot(root);
                }

                panelRootRef.current.render(children);
            },
            ...props,
        });

        return () => {
            search.destroy();
        };
    }, [props]);

    return <div ref={containerRef} className={className} />;
}
