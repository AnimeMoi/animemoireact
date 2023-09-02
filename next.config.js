/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      // "st.ntcdntempv3.com",
      "st.nettruyenus.com",
      "storage.yurineko.net",
      "animemoi.somee.com",
      "animemoi.up.railway.app",
      "animemoiapi.onrender.com",
      "st.nettruyenmax.com",
      "sayhentai.me",
      "p.ntcdntempv26.com",
      "t.hentaivn.site",
      "honeysanime.com",
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
