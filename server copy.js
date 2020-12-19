const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var path = require('path');

const port = 80;
var env = {
    root : __dirname,
    dataFolder : '/var/_localData',
    appFolder : '/var/_localApp'
}
var pkg = {
    require : function(fileName, isCache) {
        if (!isCache) {
            delete require.cache[fileName];
        }
        return require(fileName);
    },
    crowdProcess : require(__dirname + '/vendor/crowdProcess/crowdProcess.js'),
    mysql : require(__dirname + '/vendor/mysql/node_modules/mysql')
}

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies   
  extended: true
})); 

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

var RESTS = 'get|put|post|delete'.split('|');

for (var i=0 ; i < RESTS.length; i++) {
    (function(i) {
        app[RESTS[i]](/(.+)$/i, (req, res) => {
            var ENGINE= pkg.require(__dirname + '/modules/appEngine.js');
            var appEng  = new ENGINE(env, pkg, req, res);
            try {
                appEng.route(RESTS[i]);
            } catch (err) {
                res.send(err.toString());
            }
        });
    })(i)
}

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
