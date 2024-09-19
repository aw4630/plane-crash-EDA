/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING, 
    },
  };
  
  module.exports = nextConfig;