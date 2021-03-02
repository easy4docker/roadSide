#!/bin/bash
cd /var/_localApp
echo $mainIP >> /var/_shareFolder/mainIP.txt
node test.js >> /var/_shareFolder/easy_ondemand.txt
#curl -d "data=@/var/_shareFolder/easy_ondemand.txt" localhost/postFile
# upload all file within /var/_shareFolder
# curl -F "objPath=/var/_localAppData/sitesShareFolder/_shareMain" $(find /var/_shareFolder/ -name '*' -type f -exec echo -n -F "file=@{} " \;) 10.10.10.254:10000/upload > /var/_shareFolder/SB.txt
# curl -F "objPath=/var/_localAppData/sitesShareFolder/_shareMain" -F "file=@/var/_shareFolder/easy_ondemand.txt" 10.10.10.254:10000/upload  > /var/_shareFolder/SB.txt
cp /var/shellScript/removeMe.json /var/_localAppData/commCron/
