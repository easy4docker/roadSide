<template>
    <span class="form-group card p-1">
        <button class="btn btn-success btn-sm m-2" v-if="module!=='addTaskFrom'" v-on:click="switchModule('addTaskFrom');">Add a task</button>
        {{module}}
        <span v-if="module==='addTaskFrom'">
            <label>Add Your Task:
                <button class="btn btn-success btn-sm m-1" v-on:click="$parent.submit();">Run</button>
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
