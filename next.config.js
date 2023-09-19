/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "animemoi.somee.com",
      "animemoi.up.railway.app",
      "animemoiapi.onrender.com",
      "anime-moi-api.onrender.com",
      "animemoi.zeabur.app",
      "honeysanime.com",
      "hoang3409.link",
      // NetTruyen
      "nettruyenus.com",
      "st.nettruyenmax.com",
      "st.nettruyenus.com",
      "st.ntcdntempv3.com",
      "telegraph-image-60t.pages.dev",
      "telegra.ph",
      // Yurineko
      "storage.yurineko.net",
      // BaoTangTruyen
      "img.baotangtruyenvip.com",
      // CManga
      "cmangaah.com",
      "cmangaaz.com",
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
