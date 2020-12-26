<template>
        <div class="container-fluid m-0 text-left">
            <div class="row">
                <div class="col-3 p-1">
                    <div class="card list_file_section p-1 mb-2 alert-secondary" >
                        <div class="form-control card p-2 text-center alert-dark">
                            Local Scripts
                        </div>
                        <div class="text-left p-1 pl-2" v-for="item in localScripts">
                            {{item.name}}
                        </div> 
                    </div>

                    <div class="card list_file_section p-1 alert-secondary">
                        <div class="form-control card  p-2 text-center alert-dark">
                            Logs
                        </div>
                        <div class="text-left p-1 pl-2" v-for="item in logs">
                            {{item.name}}
                        </div> 
                    </div>
                    <!--div class="card p-1 text-center alert-success">
                        <textarea class="form-control" rows="16" readonly>{{logs}}</textarea-->
                    </div>

                </div>
                <div class="col-8 p-1">
                    <div class="card main_list_file_section p-1" >
                        <schedule-task-form></schedule-task-form>
                        <div class="text-left p-1 pl-2" v-for="item in scheduledTasks">
                            {{item.name}}
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
            localScripts : [],
            scheduledTasks :[],
            logs    : [],
            module  : ''
        }
    },
    mounted () {
        var me = this;
        setTimeout(
            function() {
                me.askBackendStatus()
            }, 50
        )
    },
    methods :{
        askBackendStatus() {
            var me = this;
            const data = me.form; 
            data.cmd = "askBackendStatus"
            me.root.dataEngine(me).sendQuery(data, function(result) {
                me.localScripts =  result.localScripts ;
                me.scheduledTasks =  result.scheduledTasks;
                me.logs =  result.logs;
                me.form.command = '';
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
.list_file_section { height : 20rem}
.main_list_file_section { min-height : 40rem}
</style>
