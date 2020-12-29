<template>
    <div class="card p-1 text-left p-2 scheduleFromSection alert-dark">
       <div class="m-2">
            Log {{fileName}}: 
            <a href="JavaScript: void(0)" v-on:click="$parent.deleteFile('log', fileName)">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </a>
       </div>
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
            contents : '',
            refresh  : ''
        }
    },
    watch: {
        fileName: function () {
            const me = this;
            me.askLogContent(fileName);
        },
        refresh : function () {
            const me = this;
            me.askLogContent(me.fileName);
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
            });
        }
    },
    components: {
    }
}
</script>
 
<style>
</style>
