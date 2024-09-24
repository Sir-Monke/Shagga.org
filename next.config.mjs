/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      // Add SVGR loader for SVGs
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
            },
          },
        ],
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  