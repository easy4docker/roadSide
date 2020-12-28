<template>
    <div class="card p-1 text-left p-2 scheduleFromSection alert-dark">
       <textarea class="form-control" rows="16" readonly>{{fileName}}</textarea>
    </div>
</template>
<script>
module.exports = {
    props: [],
    data: function() {
        const me = this;
        return {
            root : this.$parent.root,
            fileName : 'v'
        }
    },
    mounted () {
    },
    methods :{
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
