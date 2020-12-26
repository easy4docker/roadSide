<template>
        <div class="container-fluid m-0 text-left">
            <div class="row">
                <div class="col-3 p-1">
                    <div class="form-control card alert-success text-center mb-1">
                        Local Scripts
                    </div>
                    <div class="card list_file_section alert-success" >
                        <div class="text-left p-1" v-for="item in localScripts">
                            {{item.name}}
                        </div> 
                    </div>
                </div>
                <div class="col-6 p-1">
                    <schedule-task-form></schedule-task-form>
                    <div class="card main_list_file_section alert-secondary" >
                        <div class="text-left p-1" v-for="item in scheduledTasks">
                            {{item.name}}
                        </div> 
                    </div>
                </div>
                <div class="col-3 p-1">
                    <div class="form-control card text-center  mb-1  alert-success">
                        Running Log
                    </div>
                    <div class="card list_file_section alert-success" >
                        <div class="text-left p-1" v-for="item in logs">
                            {{item.name}}
                        </div> 
                    </div>
                    <!--div class="card p-1 text-center alert-success">
                        <textarea class="form-control" rows="16" readonly>{{logs}}</textarea-->
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
.list_file_section { min-height : 30rem}
.main_list_file_section { min-height : 22rem}
</style>
