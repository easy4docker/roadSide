<template>
        <div class="container-fluid m-0 text-left">
            <div class="row">
                <div class="col-3 p-1">
                    <div class="form-control card alert-success text-center mb-1">
                        Local Scripts
                    </div>
                    <div class="card p-1 text-center alert-success">
                        <textarea class="form-control" rows="16" readonly>{{localScripts}}</textarea>
                    </div>
                </div>
                <div class="col-6 p-1">
                    <schedule-task-form></schedule-task-form>
                   
                    <div class="card p-1 text-left alert-warning">
                        <textarea class="form-control" rows="16" readonly>{{scheduledTasks}}</textarea>
                    </div>
                </div>
                <div class="col-3 p-1">
                    <div class="form-control card text-center  mb-1  alert-success">
                        Running Log
                    </div>
                    <div class="card p-1 text-center alert-success">
                        <textarea class="form-control" rows="16" readonly>{{logs}}</textarea>
                    </div>
                </div>
            </div>
        </div> 
</template>
 
<script>
module.exports = {
    data: function() {
        return {
            root     :  this.$parent.root,
            form     : {
                command: ''
            },
            localScripts : {},
            scheduledTasks :{},
            logs    : {},
            module  : ''
        }
    },
    mounted () {
        var me = this;
    },
    methods :{
        submit() {
            var me = this;
            const data = me.form; 
            data.cmd = "askBackendStatus"
            me.root.dataEngine(me).sendQuery(data, function(result) {
                me.localScripts =  result;
                me.scheduledTasks =  result;
            });
        }
    },
    components: VUEApp.loadComponents({
        LOAD    : {
            'scheduleTaskForm' : '/js/vueApp/scheduleTaskForm.vue'
        }
    })
}
</script>
 
<style>

</style>
