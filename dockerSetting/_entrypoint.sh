#!/bin/bash
# /entrypoint.sh && mysqld
echo "{\"MAIN_PORT\":\"$MAIN_PORT\",\"MYSQL_ROOT_PASSWORD\":\"$MYSQL_ROOT_PASSWORD\",\"MYSQL_ROOT_HOST\":\"$MYSQL_ROOT_HOST\"}" > /var/_masterInfo.json
cd /var/_localApp
node server.js