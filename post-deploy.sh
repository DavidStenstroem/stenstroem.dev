#!/bin/bash

/home/david/.nvm/versions/node/v12.5.0/bin/lerna bootstrap --hoist
/home/david/.nvm/versions/node/v12.5.0/bin/npm run build:server

/home/david/.nvm/versions/node/v12.5.0/bin/npm run build:app
mv /home/apps/stenstroem-dev/packages/app/dist/* /var/www/stenstroem.dev/html
