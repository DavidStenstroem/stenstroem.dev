#!/bin/bash

lerna bootstrap --hoist
npm run build:server

npm run build:app
mv /home/apps/stenstroem-dev/packages/app/dist/* /var/www/stenstroem.dev/html
