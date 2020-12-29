<template>
    <span>
        <div class="card p-1 text-left p-2 scheduleFromSection alert-dark">
            <label class="m-2">Add Your Task 
                <input class="ml-3" type="radio" v-model="form.type" value=""> Command
                <input class="ml-3" type="radio" v-model="form.type" value="C"> Cron Task
            </label>
            <input type="text" class="form-control" v-model="form.command" placeholder="Input shell command">
  
            <div class="container-fluid m-1" v-if="form.type==='C'">
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-4">Cron Schedule</div>
                    <div class="col-sm-6"></div>
                </div>
                <div class="row">
                    <div class="col-sm-1">MIN</div>
                    <div class="col-sm-1">HOUR</div>
                    <div class="col-sm-1">DOM</div>
                    <div class="col-sm-1">MON</div>
                    <div class="col-sm-1">DOW</div>
                    <div class="col-sm-1">CMD</div>
                    <div class="col-sm-6"></div>
                </div>
                <div class="row">
                    <div class="col-sm-1">*</div>
                    <div class="col-sm-1">*</div>
                    <div class="col-sm-1">*</div>
                    <div class="col-sm-1">*</div>
                    <div class="col-sm-1">*</div>
                    <div class="col-sm-1">*</div>
                    <div class="col-sm-6"></div>
                </div>
            </div>
            <div class="p-3 text-right">
                <button class="btn btn-success btn-sm m-1" :disabled="saveDisable()" v-on:click="saveTask();">Submit</button>
                <button class="btn btn-secondary btn-sm m-1" v-on:click="cancel();">Cancel</button>
            </div>    
        </div>
    </span>
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
        },
        saveDisable () {
            return (!this.$parent.command) ? true : false;
        },
        saveTask () {
            var me = this;
            const data = {cmd : 'saveTask', command : me.$parent.command}; 
            me.root.dataEngine(me).saveTask(data, function(result) {
                me.cancel()
                setTimeout(
                    function() {
                        me.$parent.askBackendStatus();
                    }, 1000);
            });
        },
        cancel() {
            var me = this;
            me.$parent.command = '';
            me.$parent.module = '';
        }
    },
    components: {
    }
}
</script>
 
<style>
.scheduleFromSection {
    min-height : 6rem;
}
</style>
