#!/bin/bash

PATH=$PATH:/home/david/.npm-global/bin
PATH=$PATH:/usr/bin

$HOME/.npm-global/bin/lerna bootstrap --hoist -- --production
lerna bootstrap --hoist -- --production
lerna run build

pm2 startOrRestart ecosystem.config.js --env production

# mv /home/apps/stenstroem-dev/packages/app/dist/* /var/www/stenstroem.dev/html
