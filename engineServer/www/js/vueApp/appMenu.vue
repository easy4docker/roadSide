<template>
    <div class="card p-1 text-left p-2 alert-dark">
        <button class="btn btn-success btn-sm m-1" :disabled="menuDisabled('addTask')" v-on:click="switchmodule('addTask);">Add Task</button>
        <button class="btn btn-success btn-sm m-1" :disabled="menuDisabled('allTasks')" v-on:click="switchmodule('allTasks');">All Tasks</button>
        <button class="btn btn-success btn-sm m-1" :disabled="menuDisabled('cronTask')" v-on:click="switchmodule('cronTask');">Cron Task</button>
    </div>
</template>
<script>
module.exports = {
    props: [],
    data: function() {
        return {
            root : this.$parent.root
        }
    },
    mounted () {
    },
    methods :{
        menuDisabled(v) {
           return (this.$parent.menu === v) ? true : false
        },
        switchmodule(v) {
            this.$parent.menu = v;
        }
    },
    components: {
    }
}
</script>
 
<style>

</style>
