#!/bin/bash
cd /var/_localApp
echo $mainIP >> /var/_shareFolder/mainIP.txt
echo $hostIP >> /var/_shareFolder/hostIP.txt
echo $onDemandCallbackHost >> /var/_shareFolder/onDemandCallbackHost.txt

node test.js >> /var/_shareFolder/easy_ondemand.txt
# upload all file within /var/_shareFolder
# if [ $hostIP = "localhost" ]; then
  goalHost=${mainIP}:10000
# else
#  goalHost=${hostIP}:10000
# fi
echo $goalHost >> /var/_shareFolder/goalHost.txt

curl -F "objPath=/var/_localAppData/sitesShareFolder/_shareMain" $(find /var/_shareFolder/ -name '*' -type f -exec echo -n -F "file=@{} " \;) ${goalHost}/upload > /var/_shareFolder/SB.txt
cp /var/shellScript/removeMe.json /var/_localAppData/commCron/
