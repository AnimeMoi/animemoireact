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
            // Tele
            "api.telegram.org",
            // NetTruyen
            "nettruyenus.com",
            "st.nettruyenmax.com",
            "st.nettruyenus.com",
            "st.ntcdntempv3.com",
            "telegraph-image-60t.pages.dev",
            "i226.ntcdntempv26.com",
            "telegra.ph",
            "cdn.cdnimgtgh.com",
            // Yurineko
            "storage.yurineko.net",
            // BaoTangTruyen
            "img.baotangtruyenvip.com",
            // CManga
            "cmangaah.com",
            "cmangaaz.com",
            "www.cmangaad.com",
            "old.cmangaaz.com",
            // hentaivn
            "t.htvncdn.net",
            "evvdsfgefdszihfdx.hentaivn.tv",
            // lxmanga
            "lxmanga.net",
            "storage.lxmanga.com",
            // sayhentai
            "sayhentai.fun",
            "cdn.sayhentai.info",
            // Google
            "lh3.googleusercontent.com"
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
