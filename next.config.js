/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    env: {
        NEXT_PUBLIC_CONVEX_URL: "https://reminiscent-lemur-498.eu-west-1.convex.cloud",
    },
};

module.exports = nextConfig;
