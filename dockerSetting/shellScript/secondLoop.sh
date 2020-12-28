stsCron=1
until [ $stsCron = 0 ]
do 
    if [ $stsCron != 0 ] ; then
        sh execPassthrough.sh >> /var/_localAppData/log.txt
       # sh cron.sh &
    fi
    sleep 2
done
