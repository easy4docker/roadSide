stsCron=1
echo "* * * * * echo `Run this command every minute` >> /var/_localAppData/log.txt" >> /etc/crontab
until [ $stsCron = 0 ]
do 
    if [ $stsCron != 0 ] ; then
        sh mainCron.sh >> /var/_localAppData/log.txt
       # sh cron.sh &
    fi
    sleep 2
done
