module.exports = {
  apps: [
    {
      name: 'mx-yun',
      script: 'npm run server',
      autorestart: true,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
