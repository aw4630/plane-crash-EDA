/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC__URL_NON_POOLING: process.env.NEXT_PUBLIC__URL_NON_POOLING, 
    },
  };
  
  module.exports = nextConfig;