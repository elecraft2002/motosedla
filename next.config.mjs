/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
