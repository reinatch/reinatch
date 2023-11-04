/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV;
const nextConfig = {
  basePath: isProd === "production" ? "/reinatch" : "",
  output: "export",
  distDir: "dist",
};
module.exports = nextConfig;
