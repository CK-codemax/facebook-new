/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'dailypost.ng',
            port: '',
          },

          {
            protocol: 'https',
            hostname: 'links.papareact.com',
            port: '',
          },

          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
          },

          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            port: '',
          },
        ]
        }
};

export default nextConfig;
