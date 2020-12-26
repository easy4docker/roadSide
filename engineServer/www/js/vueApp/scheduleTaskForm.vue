<template>
    <div class="card p-1 text-left alert-warning mb-1 scheduleFromSection">
        <span v-if="module!=='addTaskFrom'" >
            Cron Tasks <button class="btn btn-success btn-sm m-1 right" v-on:click="switchModule('addTaskFrom');">Schedule a task</button>
        </span>
        <span v-if="module==='addTaskFrom'">
            <label>Add Your Task:
                <button class="btn btn-success btn-sm m-1" v-on:click="saveTask();">Submit</button>
                <button class="btn btn-secondary btn-sm m-1" v-on:click="switchModule('');">Cancel</button>
            </label>
            <textarea class="form-control" rows="2" id="query" v-model="form.command" v-on:keyup.enter="submit" 
            placeholder="Input shell command"></textarea>
        </span>
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
            },
            module : ''
        }
    },
    mounted () {
    },
    methods :{
        switchModule(v) {
            this.module = v;
        },
        saveTask () {
            var me = this;
            const data = me.form; 
            data.cmd = "saveTask"
            me.root.dataEngine(me).saveTask(data, function(result) {
                console.log(result);
                /*
                me.localScripts =  result.localScripts ;
                me.scheduledTasks =  result.scheduledTasks;
                me.logs =  result.logs;*/
            });
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
