/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/onboarding',
                permanent: true,
            }
        ]
    }
};

export default nextConfig;
