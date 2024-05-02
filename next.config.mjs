/* @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatars.githubusercontent.com'], // Add the domain here
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/[**', // Use wildcard to allow all paths
            },
        ],
    },
};

export default nextConfig;
