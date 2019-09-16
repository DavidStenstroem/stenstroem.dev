#!/bin/bash

PATH="/home/david/.nvm/versions/node/v12.5.0/bin:$PATH"

lerna bootstrap --hoist
npm run build:server

npm run build:app
mv /home/apps/stenstroem-dev/packages/app/dist/* /var/www/stenstroem.dev/html
