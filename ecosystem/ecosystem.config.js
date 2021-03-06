module.exports = {
  apps: [
    {
      script: 'app/index.js',
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
