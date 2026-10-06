/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  experimental: { inlineCss: true },
  async headers() {
    return [
      {
        // Povolí bfcache (zpět/vpřed bez nového načtení); výchozí `no-store` ho blokuje.
        source: "/:lang(cs|en)/:path*",
        headers: [
          { key: "Cache-Control", value: "private, no-cache, must-revalidate" },
        ],
      },
    ];
  },
  poweredByHeader: false,
  images: {
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1600],
    imageSizes: [16, 32, 64, 128, 256, 384],
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
};

export default nextConfig;

// const prismic = require("@prismicio/client");
// const sm = require("./slicemachine.config.json");

// const client = prismic.createClient(sm.repositoryName);

// module.exports = async () => {
//   const repository = await client.getRepository();
//   const locales = repository.languages.map((lang) => lang.id);

//   return {
//     images: {
//       remotePatterns: [
//         {
//           hostname: "*",
//         },
//       ],
//     },
//     i18n: {
//       locales,
//       defaultLocale: locales[0],
//     },
//   };
// };
