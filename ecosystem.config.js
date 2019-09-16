const { join } = require('path')

module.exports = {
  apps: [
    {
      name: '@stenstroem-dev/server',
      script: join(__dirname, './packages/server/dist/server/src/index.js'),

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 4,
      autorestart: true,
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: 'david',
      host: '142.93.231.151',
      key: '~/.ssh/stenstroem-dev-droplet_rsa',
      ref: 'origin/master',
      repo: 'https://github.com/DavidStenstroem/stenstroem-dev.git',
      path: '/home/david/apps',
      /*'post-deploy':
        'lerna bootstrap --hoist -- --production && lerna run build && pm2 startOrRestart ecosystem.config.js --env production',*/
    },
  },
}
