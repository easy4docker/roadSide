#!/bin/bash
cd /var/_localApp
echo $onDemandCallbackHost >> /var/_shareFolder/onDemandCallbackHost.txt
node test.js >> /var/_shareFolder/easy_ondemand.txt

cp /var/shellScript/removeMe.json /var/_localAppData/commCron/
