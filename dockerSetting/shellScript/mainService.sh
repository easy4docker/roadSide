cron start

DATA_DIR="/var/_localAppData"
LOG_PATH=$DATA_DIR/_log
mkdir -p $LOG_PATH

stsCron=1
until [ $stsCron = 0 ]
do 
    if [ $stsCron != 0 ] ; then
        sh execPassthrough.sh
    fi
    sleep 1
done
