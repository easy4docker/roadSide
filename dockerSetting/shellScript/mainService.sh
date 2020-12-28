cron start
stsCron=1
until [ $stsCron = 0 ]
do 
    if [ $stsCron != 0 ] ; then
        sh execPassthrough.sh >> /var/_localAppData/log.txt
    fi
    sleep 1
done
