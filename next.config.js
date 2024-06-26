/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: '/(.*)',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=0, must-revalidate',
              },
            ],
          },
        ]
      }
}

module.exports = nextConfig
