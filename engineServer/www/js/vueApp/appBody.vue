<template>
    <div class="card m-1">
        <div class="card-body card-list-section pt-0">
            <div class="container-fluid mt-1 text-left">
                <div class="form-group">
                    <label>Cloud Query Tool:
                        <!--button class="btn btn-fluid btn-success btn-sm m-2" v-on:click="submit();">Run</button>
                        <button class="btn btn-fluid btn-secondary btn-sm m-2" v-on:click="close();">Cancel</button-->
                    </label>
                    <textarea class="form-control" rows="2" id="query" v-model="form.sql" v-on:keyup.enter="submit" placeholder="Input SQL sentences"></textarea>
                </div>
                <textarea class="form-control" rows="16" id="queryResult" readonly>{{result}}</textarea>
            </div>
        </div> 
    </div> 
</template>
 
<script>
module.exports = {
    data: function() {
        return {
            root     :  this.$parent.root,
            form     : {
                sql : ''
            },
            result : ''
        }
    },
    mounted () {
        
    },
    methods :{
        submit() {
            var me = this;
            me.root.dataEngine(me).sendQuery(me.form, function(data) {
                me.result =  JSON.stringify(data);
            });
        }
    },
    components: {

    }
}
</script>
 
<style>

</style>
