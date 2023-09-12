/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "animemoi.somee.com",
      "animemoi.up.railway.app",
      // "animemoiapi.onrender.com",
      "anime-moi-api.onrender.com",
      "animemoi.zeabur.app",
      "sayhentai.me",
      "t.hentaivn.site",
      "honeysanime.com",
      "hoang3409.link",
      // NetTruyen
      // "nettruyenus.com",
      "st.nettruyenmax.com",
      "st.nettruyenus.com",
      // Yurineko
      "storage.yurineko.net",
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "*.ntcdntempv3.com",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
