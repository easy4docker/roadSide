<template>
    <span class="form-group card p-1">
        <button class="btn btn-fluid btn-success btn-sm m-2" v-if="module!=='add'" v-on:click="$parent.submit();">Add a task</button>
        <span v-if="module!=='add'">
            <label>Add Your Task:
                <button class="btn btn-fluid btn-success btn-sm m-2" v-on:click="$parent.submit();">Run</button>
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
        addTask() {
            this.module = 'addTask';
        }
    },
    methods :{
    },
    components: {
    }
}
</script>
 
<style>

</style>
