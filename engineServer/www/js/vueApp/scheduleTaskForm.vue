<template>
    <div class="card p-1 text-left p-2 scheduleFromSection alert-dark">
        <label>Add Your Task:
            <button class="btn btn-success btn-sm m-1" :disabled="saveDisable()" v-on:click="saveTask();">Submit</button>
            <button class="btn btn-secondary btn-sm m-1" v-on:click="cancel();">Cancel</button>
        </label>
        <textarea class="form-control" rows="2" id="query" v-model="$parent.command" v-on:keyup.enter="submit" 
        placeholder="Input shell command"></textarea>
    </div>
</template>
<script>
module.exports = {
    props: [],
    data: function() {
        const me = this;
        return {
            root : this.$parent.root
        }
    },
    mounted () {
    },
    methods :{
        saveDisable () {
            return (!this.$parent.command) ? true : false;
        },
        saveTask () {
            var me = this;
            const data = {cmd : 'saveTask', command : me.$parent.command}; 
            me.root.dataEngine(me).saveTask(data, function(result) {
                me.cancel()
                setTimeout(
                    function() {
                        me.$parent.askBackendStatus();
                    }, 1000);
            });
        },
        cancel() {
            var me = this;
            me.$parent.command = '';
            me.$parent.module = '';
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
