<template>
    <span class="form-group card p-1 alert-warning">
        <span v-if="module!=='addTaskFrom'" >
            Cron Tasks <button class="btn btn-success btn-sm m-1" v-on:click="switchModule('addTaskFrom');">Schedule a task</button>
        </span>
        <span v-if="module==='addTaskFrom'">
            <label>Add Your Task:
                <button class="btn btn-success btn-sm m-1" v-on:click="$parent.submit();">Schedule</button>
                <button class="btn btn-secondary btn-sm m-1" v-on:click="switchModule('');">Cancel</button>
            </label>
            <textarea class="form-control" rows="2" id="query" v-model="form.command" v-on:keyup.enter="submit" 
            placeholder="Input shell command"></textarea>
        </span>
    </span>
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
        }
    },
    components: {
    }
}
</script>
 
<style>

</style>
