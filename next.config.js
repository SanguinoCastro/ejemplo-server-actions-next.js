/** @type {import('next').NextConfig} */
const nextConfig = {
  // Añadimos serverActions como experimental ya que es un servicio en alpha
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
