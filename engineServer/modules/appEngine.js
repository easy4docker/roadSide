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
					case 'askLocalScripts':
						const dirTree = pkg.require(env.root + '/vendor/directory-tree/node_modules/directory-tree');
						const tree = dirTree(env.appFolder + '/mainServer');
						res.send(tree);
						break;
					default:
						res.send('Missing posted cmd');
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

		this.runGet = ()=> {
			var _tokens = me.getTokens();
			var token=req.query.token;
			if ((!token || !_tokens || !_tokens.list || !_tokens.list[token])  && !(/^\/(css|js|images)\//ig.test(p))) {
				res.sendFile(env.root  + '/www/page401.html');
			} else {
				let fn = (/\/$/.test(p)) ? (env.root + '/views' + p + 'index.ect') : (env.root + '/www' + p);
				if (!/\.ect$/.test(fn)) {
					let m = fn.match(/\.(html|js|css|jsx|vue|txt)$/ig);
	
					fs.stat(fn, function(err, stat) {
						if(err == null) {
							if (!m || !m[1]) {
								res.sendFile(fn);
							} else {
								fs.readFile(fn, 'utf-8', (err, data)=> {
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
