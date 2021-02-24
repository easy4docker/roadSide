#!/bin/bash
cd /var/_localApp
node test.js >> /var/_localAppData/easy_ondemand.txt
cp /var/shellScript/onDemand.json /var/_localAppData/commCron/
