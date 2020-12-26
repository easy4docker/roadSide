<template>
</template>

<script>
module.exports = {
    props: [],
    data: function() {
        return {
            caller : null
        }
    },
    created() {
        var me = this;
    },
    methods :{
        ajaxPost(data, callback, isSpinner) {
            var me = this;
            if (isSpinner) me.$parent.triggerSpinner = true;
            $.ajax({
                type: 'POST',
                url:'/api?token=' + me.$parent.token,
                data: data,
                success: function(result) {
                    if (isSpinner) me.$parent.triggerSpinner = false;
                    callback(result)
                },
                error: function (jqXHR, textStatus, errorThrown) { 
                    if (isSpinner) me.$parent.triggerSpinner = false;
                    callback('error result');
                },
                dataType: 'JSON'
            });
        },
        sendQuery(data, callback) {
            var me = this;
            me.ajaxPost(data, callback, true);
        },
        saveTask(data, callback) {
            var me = this;
            me.ajaxPost(data, callback, true);
        }
    }
}
</script>
 
<style>
</style>
