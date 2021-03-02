#!/bin/bash
cd /var/_localApp
echo $mainIP >> /var/_shareFolder/mainIP.txt
echo $hostIP >> /var/_shareFolder/hostIP.txt
node test.js >> /var/_shareFolder/easy_ondemand.txt
# upload all file within /var/_shareFolder
if [ $hostIP = "localhost" ]; then
  goalHost=$hostIP
else
  goalHost=${hostIP}:10000
fi
echo $goalHost >> /var/_shareFolder/goalHost.txt

curl -F "objPath=/var/_localAppData/sitesShareFolder/_shareMain" $(find /var/_shareFolder/ -name '*' -type f -exec echo -n -F "file=@{} " \;) 142.93.73.66:10000/upload > /var/_shareFolder/SB.txt
cp /var/shellScript/removeMe.json /var/_localAppData/commCron/
