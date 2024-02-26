/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'dailypost.ng',
            port: '',
          },
        ]
        }
};

export default nextConfig;
