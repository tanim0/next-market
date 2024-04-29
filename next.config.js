/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"] // next.jsの<Image>でurlの画像を表示させるための設定
  }
}

module.exports = nextConfig
