/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/san-antonio', destination: '/texas/san-antonio', permanent: true },
      { source: '/houston',     destination: '/texas/houston',     permanent: true },
      { source: '/dallas',      destination: '/texas/dallas',      permanent: true },
      { source: '/austin',      destination: '/texas/austin',      permanent: true },
    ];
  },
};

export default nextConfig;
