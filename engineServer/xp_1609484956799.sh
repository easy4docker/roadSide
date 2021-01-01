echo "=== CRON RUN $(date +"%m-%d %H:%M:%S") ===" >> xp_1609484956799.sh/_log/cron.log ===
cd /var/_localApp
node test.js| sed 's/^/	>>	/' >> /var/_localAppData/_log/cron.log
echo "	CRON Done $(date +"%m-%d %H:%M:%S") " >> xp_1609484956799.sh/_log/cron.log

