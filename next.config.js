/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "st.nettruyenus.com",
            "storage.yurineko.net",
            "animemoi.somee.com",
            "animemoi.up.railway.app",
            "animemoiapi.onrender.com",
            "sayhentai.me",
            "nettruyenus.com",
            "t.hentaivn.site",
            "honeysanime.com",
            "hoang3409.link",
            "st.nettruyenmax.com"
        ],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '*.ntcdntempv3.com',
            },
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
    },
};

module.exports = nextConfig;
