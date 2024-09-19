/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC__URL: process.env.NEXT_PUBLIC__URL, 
    },
  };
  
  module.exports = nextConfig;