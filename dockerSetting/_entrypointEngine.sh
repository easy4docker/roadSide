#!/bin/bash
# /entrypoint.sh && mysqld
echo "{\"MAIN_PORT\":\"$MAIN_PORT\",\"ROOT_PASSWORD\":\"$ROOT_PASSWORD\",\"ROOT_HOST\":\"$ROOT_HOST\"}" > /var/_masterInfo.json
cd /var/_localApp/engineServer
node server.js