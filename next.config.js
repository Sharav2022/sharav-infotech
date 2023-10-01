/** @type {import('next').NextConfig} */

const nextConfig = () => {
  return {
    reactStrictMode: false,
    swcMinify: true,
    distDir: "build",
    basePath: "",
    images: {
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
      return config;
    },
    env: {
      SENDGRID_API_KEY:
        "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",
    },
  };
};

module.exports = nextConfig();
