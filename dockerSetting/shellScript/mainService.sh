cron start
stsCron=1
until [ $stsCron = 0 ]
do 
    if [ $stsCron != 0 ] ; then
        sh execPassthrough.sh
    fi
    sleep 1
done
