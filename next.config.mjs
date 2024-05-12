/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "www.gravatar.com",
                pathname: "/avatar/*",
            }
        ]
    }
};

export default nextConfig;
