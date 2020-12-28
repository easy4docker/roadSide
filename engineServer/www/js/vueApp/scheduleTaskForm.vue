<template>
    <div class="card p-1 text-left p-2 scheduleFromSection alert-dark">
        <label>Add Your Task:
            <button class="btn btn-success btn-sm m-1" :disabled="saveDisable()" v-on:click="saveTask();">Submit</button>
            <button class="btn btn-secondary btn-sm m-1" v-on:click="switchModule('allTasks');">Cancel</button>
        </label>
        <textarea class="form-control" rows="2" id="query" v-model="form.command" v-on:keyup.enter="submit" 
        placeholder="Input shell command"></textarea>
    </div>
</template>
<script>
module.exports = {
    props: ['token'],
    data: function() {
        return {
            root : this.$parent.root,
            form : {
                command : ''
            }
        }
    },
    mounted () {
    },
    methods :{
        saveDisable () {
            return (!this.form.command) ? true : false;
        },
        saveTask () {
            var me = this;
            const data = me.form; 
            data.cmd = "saveTask"
            me.root.dataEngine(me).saveTask(data, function(result) {
                me.form.command = '';
                me.$parent.askBackendStatus();
            });
        },
        switchmodule(v) {
            this.$parent.module = v;
            this.$forceUpdate();
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
