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
				var CloudBackend= pkg.require(env.root + '/modules/moduleCloudBackend.js');
				var cb  = new CloudBackend(env, pkg, req, res);
				if (cb[req.body.cmd]) {
					cb[req.body.cmd](req.body);
				} else {
					res.send({status: 'error', message: 'Missing function ' + req.body.cmd + '!'});
				}
			}
		}

		this.getTokens = () => {
			var tokens = {};
			try {
				tokens = pkg.require('/var/_localAppEnv/token.json');
			} catch (e) {}
			return tokens;
		}
		this.sendHeader = (filetype) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "X-Requested-With");
			res.header('Access-Control-Allow-Headers', 'Content-Type'); 
			if (filetype == 'js' || filetype == 'jsx' || filetype == 'vue') {
				res.setHeader('Content-Type', "text/javascrip");
			} else if (filetype == 'css') {
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
									me.sendHeader(m[0].replace(/\./,''));
									res.send((err) ? err.message : data);
								});
							}
						} else  {
							res.sendFile(env.root  + '/www/page404.html');
						}
					});
				} else {
					res.render(fn, req.query);
				}
			}
		}
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
