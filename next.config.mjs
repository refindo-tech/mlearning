/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/onboarding',
                permanent: true,
            }
        ]
    },
};

export default nextConfig;
