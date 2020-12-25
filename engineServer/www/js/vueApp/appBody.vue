<template>
    <div class="card m-1">
        <div class="card-body card-list-section pt-0">
            <div class="container-fluid mt-1 text-left">
                <div class="form-group">
                    <label>Backend Cloud Task:
                        <button class="btn btn-fluid btn-success btn-sm m-2" v-on:click="submit();">Run</button>
                    </label>
                    <textarea class="form-control" rows="2" id="query" v-model="form.command" v-on:keyup.enter="submit" 
                    placeholder="Input command"></textarea>
                </div>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-4 p-1 text-center">
                            <textarea class="form-control" rows="16" readonly>{{result}}</textarea>
                        </div>
                        <div class="col-4 p-1 text-center">
                            <textarea class="form-control" rows="16" readonly>{{result}}</textarea>
                        </div>
                        <div class="col-4 p-1 text-center">
                            <textarea class="form-control" rows="16" readonly>{{result}}</textarea>
                        </div>
                    </div>
                </div>
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
                command: ''
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
                me.result =  data;
                // me.result =  JSON.stringify(data);
            });
        }
    },
    components: {

    }
}
</script>
 
<style>

</style>
