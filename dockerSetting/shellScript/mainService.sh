cron start
APP_DIR="/var/_localApp"
DATA_DIR="/var/_localAppData"

CRON_PATH=$DATA_DIR/_cron
TMP_PATH=$DATA_DIR/_tmp
LOG_PATH=$DATA_DIR/_log

stsCron=1
until [ $stsCron = 0 ]
do 
    if [ $stsCron != 0 ] ; then
        sh execPassthrough.sh >> $LOG_PATH/mainService.sh.log
    fi
    sleep 1
done
