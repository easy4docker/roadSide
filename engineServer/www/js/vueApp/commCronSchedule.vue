<template>
    <div class="container-fluid m-1">
        <div class="row">
            <div class="col-sm-6">Cron Schedule</div>
            <div class="col-sm-6"></div>
        </div>
        <div class="row">
            <div class="col-sm-2"></div>
            <div class="col-sm-10">
                <div class="container-fluid m-1">
                    <div class="row text-center">
                        <div class="col-sm-2">MIN</div>
                        <div class="col-sm-2">HOUR</div>
                        <div class="col-sm-2">DOM</div>
                        <div class="col-sm-2">MON</div>
                        <div class="col-sm-2">DOW</div>
                        <div class="col-sm-2">CMD</div>
                    </div>
                    <div class="row text-center">
                        <div class="col-sm-2 text-center form-group">
                            <select class="form-control" v-model="MON">
                                <option v-bind:value="'*'">{{MON}}<div>
                                <option v-for="item in getList(60)" v-bind:value="item">
                                    {{ item}}
                                </option>
                            </select>
                        </div>
                        <div class="col-sm-2 text-center">*</div>
                        <div class="col-sm-2 text-center">*</div>
                        <div class="col-sm-2 text-center">*</div>
                        <div class="col-sm-2 text-center">*</div>
                        <div class="col-sm-2 text-center">*</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
module.exports = {
    props: [],
    data: function() {
        const me = this;
        return {
            MON : '*'
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
