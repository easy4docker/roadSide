<template>
    <div class="card p-1 text-left p-2 scheduleFromSection alert-dark">
        Log {{fileName}}: 
       <textarea class="form-control" rows="20" readonly>{{contents}}</textarea>
    </div>
</template>
<script>
module.exports = {
    props: [],
    data: function() {
        const me = this;
        return {
            root : this.$parent.root,
            fileName : '',
            contents : ''
        }
    },
    watch: {
        fileName: function (v) {
            const me = this;
            me.askLogContent(v);
        }
    },
    mounted () {
    },
    methods :{
        askLogContent (v) {
            const me = this;
            const data = {cmd : 'askLogContent', fileName : v}; 
            me.root.dataEngine(me).askLogContent(data, function(result) {
                me.contents = result;
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
