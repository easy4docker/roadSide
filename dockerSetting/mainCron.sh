#!/bin/bash

DATA_DIR="/var/_localAppData"

CRON_PATH=$DATA_DIR/_cron
TMP_PATH=$DATA_DIR/_tmp
LOG_PATH=$DATA_DIR/_log

mkdir -p $CRON_PATH
mkdir -p $TMP_PATH
mkdir -p $LOG_PATH

markfile=$DATA_DIR/mark.data

# --- clean longer time task -----
for file in $(find $markfile -not -newermt '-120 seconds' 2>&1) ;do
  if [ -f "$markfile" ]; then
    vfn=$(<$markfile)
    cmda="rm -fr $vfn && pkill -f $vfn > /dev/null && rm -fr $markfile >/dev/null 2>&1"
    eval "$cmda"
  fi
done

for f in "$CRON_PATH"/*; do

  if [ -f "$markfile" ]; then
    break;
  fi

  if [ -f "$f" ]; then

    execfn=$TMP_PATH/SH_$(basename $f)
    echo $execfn > $markfile
    # cmdd="cp $f /Users/johnxu/_tmp && mv $f $execfn && sh $execfn $DOCKERCMD && rm -fr $execfn && rm -fr $markfile"
    echo "-- Ran $f -- at $(date +"%m/%d/%Y %H:%M:%S")"
    mv -f $f $execfn || true
    sh $execfn >> $LOG_PATH/$$(basename $f).log
    rm -fr $execfn || true
    rm -fr $markfile || true
    echo "-- done $f -- at $(date +"%m/%d/%Y %H:%M:%S")"
  else
    exit 1
  fi
done
