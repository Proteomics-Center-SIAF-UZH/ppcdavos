/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    env: {
        NEXT_PUBLIC_CONVEX_URL: "https://impartial-bee-571.eu-west-1.convex.cloud",
    },
};

module.exports = nextConfig;
