<template>
    <div class="container-fluid m-1" v-if="form.type==='C'">
        <div class="row">
            <div class="col-sm-6">Cron Schedule</div>
            <div class="col-sm-6"></div>
        </div>
        <div class="row text-center">
            <div class="col-sm-1"></div>
            <div class="col-sm-1">MIN</div>
            <div class="col-sm-1">HOUR</div>
            <div class="col-sm-1">DOM</div>
            <div class="col-sm-1">MON</div>
            <div class="col-sm-1">DOW</div>
            <div class="col-sm-1">CMD</div>
            <div class="col-sm-5"></div>
        </div>
        <div class="row text-center">
            <div class="col-sm-1"></div>
            <div class="col-sm-1 text-center">*</div>
            <div class="col-sm-1 text-center">*</div>
            <div class="col-sm-1 text-center">*</div>
            <div class="col-sm-1 text-center">*</div>
            <div class="col-sm-1 text-center">*</div>
            <div class="col-sm-1 text-center">*</div>
            <div class="col-sm-5 text-center"></div>
        </div>
    </div>
</template>
<script>
module.exports = {
    props: [],
    data: function() {
        const me = this;
        return {
            root : this.$parent.root,
            form : {
                command : '',
                type : '',
                schedule : ''
            }
        }
    },
    mounted () {
    },
    watch: {
        form: {
            deep : true,
            handler: function (v) {

            }
        }
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
