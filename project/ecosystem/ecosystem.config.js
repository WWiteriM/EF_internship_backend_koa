module.exports = {
  apps: [
    {
      script: 'src/index.js',
      watch: true,
      port: 4000,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
