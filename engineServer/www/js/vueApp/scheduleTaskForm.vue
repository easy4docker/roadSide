<template>
    <div class="form-group">
        <label>Add Your Task:
            <button class="btn btn-fluid btn-success btn-sm m-2" v-on:click="submit();">Run</button>
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
            root : this.$parent.root
        }
    },
    mounted () {
  
    },
    methods :{
        submit() {}
    },
    components: {
    }
}
</script>
 
<style>

</style>
