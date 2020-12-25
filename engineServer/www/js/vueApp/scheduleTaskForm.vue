<template>
    <span class="form-group card p-1">
        <label>Add Your Task:
            <button class="btn btn-fluid btn-success btn-sm m-2" v-on:click="$parent.submit();">Run</button>
        </label>
        <textarea class="form-control" rows="2" id="query" v-model="form.command" v-on:keyup.enter="submit" 
        placeholder="Input shell command"></textarea>
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
            }
        }
    },
    mounted () {
  
    },
    methods :{
    },
    components: {
    }
}
</script>
 
<style>

</style>
