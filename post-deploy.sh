#!/bin/bash

PATH=$PATH:/home/david/.npm-global/bin
PATH=$PATH:/usr/bin

# $HOME/.npm-global/bin/lerna bootstrap --hoist -- --production
lerna bootstrap --hoist
lerna run build -- --production

pm2 startOrRestart ecosystem.config.js --env production

cp /home/david/apps/source/packages/app/dist/* /var/www/stenstroem.dev/html
echo "All done!"