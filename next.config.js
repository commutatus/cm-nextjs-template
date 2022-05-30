const { createSecureHeaders } = require("next-secure-headers");

module.exports = () => {
  return {
    eslint: {
      ignoreDuringBuilds: true,
    },
    webpack: (config) => {
      // load worker files as a urls by using Asset Modules
      // https://webpack.js.org/guides/asset-modules/
      config.module.rules.unshift({
        test: /pdf\.worker\.(min\.)?js/,
        type: "asset/resource",
        generator: {
          filename: "static/worker/[hash][ext][query]",
        },
      });
      return config;
    },
    images: {
      domains: [
        // if you have a Image CDN provider, add it here.
      ],
      deviceSizes: [350, 450, 500, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: createSecureHeaders({
            forceHTTPSRedirect: [true, { maxAge: 63072000 }],
            frameGuard: "deny",
            noopen: "noopen",
            nosniff: "nosniff",
            xssProtection: "sanitize",
            contentSecurityPolicy: {
              directives: {
                defaultSrc: [
                  "*",
                  "data:",
                  "blob:",
                  "'unsafe-inline'",
                  "'unsafe-eval'",
                ],
              },
            },
          }),
        },
      ];
    },
    poweredByHeader: false,
    async redirects() {
      return [
        {
          source: "/:slug*.php",
          destination: "/no-php",
          permanent: true,
        },
      ];
    },
  };
};
