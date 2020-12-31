<template>
        <div class="container-fluid m-0 text-left">
            <div class="row">
                <div class="col-3 p-1">
                    <div class="card p-1 mb-1 alert-secondary" >
                        <div class="form-control card p-2 text-center alert-dark">
                            <div class="container-fluid m-0 text-center">
                                <div class="row">
                                    <div class="col-1 p-0">
                                        <a href="JavaScript:void(0)" v-on:click="pullGitCode()">
                                            <i class="fa fa-github"></i>
                                        </a>
                                    </div>
                                    <div class="col-10 p-0">
                                        Local Scripts ({{localScripts.length}})
                                    </div>
                                    <div class="col-1 p-0">
                                        <a href="JavaScript:void(0)" v-on:click="pullGitCode()">
                                            <i class="fa fa-minus"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-left p-1 pl-2 list_file_section">
                            <div v-for="item in localScripts">
                                <a href="JavaScript:void(0)" v-on:click="passCommand(item.name)">{{item.name}}</a>
                            </div>
                        </div>
                    </div>

                    <div class="card p-1 mt-1 alert-secondary">
                        <div class="form-control card  p-2 text-center alert-dark">
                            Logs ({{logs.length}})
                        </div>
                        <div class="text-left p-1 pl-2 list_file_section">
                            <div v-for="item in logs">
                                <a href="JavaScript: void(0)" v-on:click="deleteFile('log', item.name)" class="mr-1">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                </a>
                                <a href="JavaScript:void(0)" v-on:click="showLog(item.name)">{{item.name}}</a>
                            </div>
                        </div>
                    </div>

                    <div class="card p-1 mt-1 alert-secondary">
                        <div class="form-control card  p-2 text-center alert-dark">
                            Output Data
                        </div>
                        <div class="text-left p-1 pl-2 list_file_section">
                            <div v-for="item in outputs">
                                <a href="JavaScript:void(0)" v-on:click="showOutput(item.name)">{{item.name}}</a>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-9 p-1">
                    <div class="card main_list_file_section p-1 alert-secondary" >
                        <app-menu></app-menu>
                        <span v-if="module=='addTask'">
                            <schedule-task-form ref="scheduleTaskForm"></schedule-task-form>
                        </span>
                        <div v-if="module=='allTasks'" class="text-left p-1 pl-2" v-for="item in scheduledTasks">
                            <a href="JavaScript:void(0)" v-on:click="showLog(item.name)">{{item.name}}</a>
                        </div>
                        <div v-if="module=='cronTasks'" class="text-left p-1 pl-2" v-for="item in cronTasks">
                            <a href="JavaScript:void(0)" v-on:click="showLog(item.name)">{{item.name}}</a>
                        </div>
                        <div v-if="module=='showLog'"  class="card p-1 text-center alert-success">
                            <show-log ref="showLog"></show-log>
                        </div>

                        <div v-if="module=='showOutput'"  class="card p-1 text-center alert-success">
                            <show-output ref="showOutput"></show-output>
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
            localScripts : [],
            scheduledTasks :[],
            logs    : [],
            outputs : [],
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
        triggerFrom(v) {
            const me = this;
            me.module = 'addTask'; 
            setTimeout(function() {
                me.$refs.scheduleTaskForm.form.command = (!v) ? '' : ('node ' + v);
                me.$refs.scheduleTaskForm.form.type = (!v) ? '' : 'C'; 
            }, 100);
        },
        deleteFile(type, fn) {
            var me = this;
            const data = {cmd: 'deleteFile', type: type, fileName: fn };
            data.cmd = "deleteFile"
            me.root.dataEngine(me).sendQuery(data, function(result) {
                me.module = '';
                me.askBackendStatus();
            });
        },
        showLog(v) {
            var me = this;
            me.module = 'showLog';
            setTimeout(
                function() {
                    me.$refs.showLog.fileName = v;
                    me.$refs.showLog.refresh = new Date().getTime();
                }, 100
            );
        },
        pullGitCode() {
            var me = this;
            const data = {cmd : 'pullGitCode'};
            me.root.dataEngine(me).sendQuery(data, function(result) {
                me.askBackendStatus();
            });
        },
        showOutput(v) {
            var me = this;
            me.module = 'showOutput';
            setTimeout(
                function() {
                    me.$refs.showOutput.fileName = v;
                }, 100
            );
        },
        askBackendStatus() {
            var me = this;
            const data = {};
            data.cmd = "askBackendStatus"
            me.root.dataEngine(me).sendQuery(data, function(result) {
                me.localScripts =  result.localScripts.filter(function(item) {
                   return  (/\.js$/.test(item.name)) ? true : false
                });
                me.scheduledTasks =  result.scheduledTasks;
                me.cronTasks =  result.scheduledTasks.filter(function(item) {
                   return  (/^xp\_/.test(item.name)) ? true : false
                });
                me.logs =  result.logs;
                me.outputs =  result.outputs;
            });
        },
        passCommand(v) {
            const me = this;
            me.module = 'allTasks';
            me.triggerFrom(v);
        }
    },
    components: VUEApp.loadComponents({
        LOAD    : {
            'scheduleTaskForm' : '/js/vueApp/scheduleTaskForm.vue',
            'appMenu' : '/js/vueApp/appMenu.vue',
            'showLog' : '/js/vueApp/showLog.vue',
            'showOutput' : '/js/vueApp/showOutput.vue',
        }
    })
}
</script>
 
<style>
.list_file_section { height : 10rem; overflow-y: auto;}
.main_list_file_section { min-height : 40.2rem; overflow-y: auto;}
</style>
