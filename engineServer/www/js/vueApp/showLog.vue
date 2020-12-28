<template>
    <div class="card p-1 text-left p-2 scheduleFromSection alert-dark">
       <textarea class="form-control" rows="28" readonly>{{fileName}}</textarea>
    </div>
</template>
<script>
module.exports = {
    props: [],
    data: function() {
        const me = this;
        return {
            root : this.$parent.root,
            fileName : ''
        }
    },
    watch: {
        fileName: function (v) {
            console.log('changed to -->' + v);
        }
    },
    mounted () {
    },
    methods :{
        askLogContent () {
            var me = this;
            const data = {cmd : 'askLogContent', fileName : me.fileName}; 
            me.root.dataEngine(me).askLogContent(data, function(result) {
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
