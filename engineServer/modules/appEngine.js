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
			res.send(req.body)
		}

		this.getTokens = () => {
			var tokens = {};
			try {
				tokens = pkg.require('/var/_localAppEnv/token.json');
			} catch (e) {

			}
			return tokens;
		}

		this.runGet = ()=> {
			var _masterInfo = pkg.require('/var/_masterInfo.json');
			res.send(me.getTokens());
			return true;
			var token=req.query.token;
			if (token !== _masterInfo.INIT_TOKEN && !(/^\/(css|js|images)\//ig.test(p))) {
				res.sendFile(env.root  + '/www/page401.html');
			} else {
				let fn = (/\/$/.test(p)) ? (env.root + '/www' + p + 'index.html') : (env.root + '/www' + p);
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
			}
		}
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
