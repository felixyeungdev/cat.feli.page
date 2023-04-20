import { env } from "./src/env.mjs";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
                port: "",
                pathname: `/images/${env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/*`,
            },
        ],
    },
};

export default nextConfig;
