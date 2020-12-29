<template>
    <div class="container-fluid m-1">
        <div class="row">
            <div class="col-sm-3">Cron Schedule</div>
            <div class="col-sm-6"></div>
        </div>
        <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-sm-9">
                <div class="container-fluid m-1">
                    <div class="row text-center">
                        <div v-for="rec in cfg" class="col-sm-2">{{rec.caption}}</div>
                    </div>
                    <div class="row text-center">
                        <div v-for="rec in cfg" class="col-sm-2 text-center form-group">
                            <select class="form-control" v-model="MIN">
                                <option v-bind:value="'*'">{{MIN}}<div>
                                <option v-for="item in rec.list" v-bind:value="item">
                                    {{item}}
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
    props: [],
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
                    list : me.getList(12)
                }
            ],
            arr : ['*', '*'],
            str : '',
            MIN : '*'
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
