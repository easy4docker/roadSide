#!/bin/bash
cd /var/_localApp
echo $mainIP >> /var/_shareFolder/mainIP.txt
node test.js >> /var/_shareFolder/easy_ondemand.txt
#curl -d "data=@/var/_shareFolder/easy_ondemand.txt" localhost/postFile
#curl -X POST --data-binary @/var/_entrypoint.sh 10.10.10.254:10000/_uploadFile
cp /var/shellScript/removeMe.json /var/_localAppData/commCron/
