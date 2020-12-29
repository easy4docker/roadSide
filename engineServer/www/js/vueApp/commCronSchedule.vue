<template>
    <div class="container-fluid m-1">
        <div class="row">
            <div class="col-sm-3">Cron Schedule</div>
            <div class="col-sm-6">{{str}}</div>
        </div>
        <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-9">
                <div class="container-fluid m-1">
                    <div class="row text-center">
                        <div v-for="(rec, idx) in cfg" class="col-sm-2">{{rec.caption}}</div>
                    </div>
                    <div class="row text-center">
                        <div v-for="(rec, idx) in cfg" class="col-sm-2 text-center form-group">
                            <select class="form-control" v-model="arr[idx]">
                                <option v-bind:value="'*'">*<div>
                                <option v-for="item in rec.list" v-bind:value="item">
                                    <div class="center">{{item}}</div>
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-2"></div>
        </div>
    </div>
</template>
<script>
module.exports = {
    props: ['str'],
    data: function() {
        const me = this;
        return {
            cfg : [
                {
                    caption : 'Minute',
                    list : me.getList(60)
                },
                {
                    caption : 'Hour',
                    list : me.getList(24)
                },
                {
                    caption : 'Day',
                    list : me.getList(31)
                },
                {
                    caption : 'Month',
                    list : me.getList(12)
                },
                {
                    caption : 'Week day',
                    list : me.getList(7)
                }
            ],
            arr : ['5', '*', '*', '*', '*']
        }
    },
    watch :{
        arr: {
            deep : true,
            handler: function (v) {
                this.str = this.arr.join(' '); 
            }
        }
    },
    mounted () {
    },
    methods :{
        getList(n) {
            const a=[];
            for (i=0 ; i < n; i++) a.push(i);
            return a;
        }
    },
    components: {}
}
</script>
 
<style>
.scheduleFromSection {
    min-height : 6rem;
}
</style>
