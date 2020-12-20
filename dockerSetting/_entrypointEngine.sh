#!/bin/bash
# /entrypoint.sh && mysqld
echo "{\"MAIN_PORT\":\"$MAIN_PORT\",\"INIT_UI_TOKEN\":\"$INIT_UI_TOKEN\",\"ROOT_PASSWORD\":\"$ROOT_PASSWORD\",\"ROOT_HOST\":\"$ROOT_HOST\"}" > /var/_masterInfo.json
cd /var/_localApp
node server.js