(function () { //
	var obj =  function (env, pkg, req, res) {
		let fs = require('fs');
		let me = this,
			p = req.params[0];

		this.route = (rest) => {
			let p = req.params[0];


			if (rest === 'get') {
				me.runGet();
			} else {
				me.runPost();
			}
		}

		this.runPost = ()=> {

			const 	_tokens = me.getTokens(),
					token=req.query.token;

			if (!token || !_tokens || !_tokens.list || !_tokens.list[token]) {
				res.sendFile(env.root  + '/www/page401.html');
			} else {
				switch (req.body.cmd) {
					case 'askBackendStatus':
						var CloudBackend= pkg.require(env.root + '/modules/moduleCloudBackend.js');
						var cb  = new CloudBackend(env, pkg, req, res);
						if (cb[req.body.cmd]) {
							cb[req.body.cmd](req.body);
						} else {
							res.send({status: 'error', message: 'Missing function ' + req.body.cmd + '!'});
						}
						break;
					default:
						res.send({status: 'error', message: 'Missing posted cmd'});
				}

			}
		}

		this.getMasterInfo = () => {
			var _masterInfo = {};
			try {
				_masterInfo = pkg.require('/var/_masterInfo.json');
			} catch (e) {}
			return _masterInfo;
		}

		this.getTokens = () => {
			var tokens = {};
			try {
				tokens = pkg.require('/var/_localAppEnv/token.json');
			} catch (e) {}
			return tokens;
		}
		this.sendHeader = (filetype) => {
			var me = this;
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "X-Requested-With");
			res.header('Access-Control-Allow-Headers', 'Content-Type'); 
			if (filetype == 'js' || filetype == 'jsx' || filetype == 'vue') {
				res.setHeader('Content-Type', "text/javascrip");
			} else if (filetype == 'css') {
				me.is_css = true;
				res.setHeader('Content-Type', "text/css");
			} else {
				res.setHeader('Content-Type', "text/plain");
			}			
		}
		this.runGet = ()=> {
			var _tokens = me.getTokens();
			var token=req.query.token;
			if ((!token || !_tokens || !_tokens.list || !_tokens.list[token])  && !(/^\/(css|js|images)\//ig.test(p))) {
				res.sendFile(env.root  + '/www/page401.html');
			} else {
				let fn = (/\/$/.test(p)) ? (env.root + '/views' + p + 'index.ect') : (env.root + '/www' + p);
				if (!/\.ect$/.test(fn)) {
					let m = fn.match(/\.(html|js|css|jsx|vue|txt|vue)$/ig);
					fs.stat(fn, function(err, stat) {
						if(err == null) {
							if (!m || !m[0]) {
								res.sendFile(fn);
							} else {
								fs.readFile(fn, 'utf-8', (err, data)=> {
									// res.send(m[0].replace(/\./,''));
									res.send(me.sendHeader(m[0]));
									res.send((err) ? err.message : data);
								});
							}
						} else  {
							res.sendFile(env.root  + '/www/page404.html');
						}
					});
				} else {
					//res.send(fn);
					res.render(fn, req.query);
				}
			}
		}
		this.getDbConfig = () => {
			var masterInfo = {};
			try {
				masterInfo = pkg.require("/var/_masterInfo.json");;
			} catch(e) {}
			
			var cfg = {
				host: masterInfo.ROOT_HOST,
				port : masterInfo.MAIN_PORT,
				user: 'root',
				password: masterInfo.ROOT_PASSWORD,
				multipleStatements: true
			};
			return cfg;
		}
		
		this.query = (sql_str, callback) => {
			var masterInfo = {};
			try {
				masterInfo = pkg.require("/var/_masterInfo.json");;
			} catch(e) {}
            try {
                var cfg = me.getDbConfig();
                var connection = pkg.mysql.createConnection(cfg);
                connection.query(sql_str, function (error, results, fields) {
                    connection.end();
                    callback((error) ? error : results);
                });
            } catch(e) {
                callback(__dirname + ':' + e.message);
            }
        }
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
