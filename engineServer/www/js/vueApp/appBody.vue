<template>
    <div class="card m-1">
        <div class="card-body card-list-section pt-0">
            <div class="container-fluid mt-1 text-left">
                <scheduleTaskForm></scheduleTaskForm>
                <div class="container-fluid m-0">
                    <div class="row">
                        <div class="col-3 p-1">
                            <div class="form-control card alert-success text-center">
                                Local Scripts
                            </div>
                            <div class="card p-1 text-center alert-success">
                                <textarea class="form-control" rows="16" readonly>{{localScripts}}</textarea>
                            </div>
                        </div>
                        <div class="col-6 p-1">
                            <div class="form-control card text-center alert-warning">
                                Scheduled command
                            </div>
                            <div class="card p-1 text-center alert-warning">
                                <textarea class="form-control" rows="16" readonly>{{scheduledCommands}}</textarea>
                            </div>
                        </div>
                        <div class="col-3 p-1">
                            <div class="form-control card text-center alert-info">
                                Running Log
                            </div>
                            <div class="card p-1 text-center alert-info">
                                <textarea class="form-control" rows="16" readonly>{{logs}}</textarea>
                            </div>
                        </div>
                    </div>
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
            scheduledCommands :{},
            logs : {}
        }
    },
    mounted () {
        var me = this;
        setTimeout(
            function() {
                me.submit();
            }, 50
        );
    },
    methods :{
        submit() {
            var me = this;
            const data = me.form; 
            data.cmd = "askLocalScripts"
            me.root.dataEngine(me).sendQuery(data, function(result) {
                me.localScripts =  result;
            });
        }
    },
    components: VUEApp.loadComponents({
        LOAD    : {
            'scheduleTaskForm' : '/js/vueApp/scheduleTaskForm.vue'
        }
    })
    /*
    components: {}
    
    components: VUEApp.loadComponents({
        LOAD    : {
            'scheduleTaskForm' : '/js/vueApp/scheduleTaskForm.vue'
        }
    })*/
}
</script>
 
<style>

</style>
