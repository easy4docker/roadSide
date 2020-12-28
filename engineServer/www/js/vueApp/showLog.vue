<template>
    <div class="card p-1 text-left p-2 scheduleFromSection alert-dark">
        Log {{fileName}}: 
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
            me.askLogContent(v);
        }
    },
    mounted () {
    },
    methods :{
        askLogContent (v) {
            var me = this;
            const data = {cmd : 'askLogContent', fileName : v}; 
            me.root.dataEngine(me).askLogContent(data, function(result) {
                console.log(result);
            });
        }
    },
    components: {
    }
}
</script>
 
<style>
</style>
