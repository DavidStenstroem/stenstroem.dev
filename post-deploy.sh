#!/bin/bash

echo "Running script" >> $HOME/log.txt

$HOME/.npm-global/bin/lerna bootstrap --hoist -- --production
npm run build:server

npm run build:app
mv /home/apps/stenstroem-dev/packages/app/dist/* /var/www/stenstroem.dev/html
