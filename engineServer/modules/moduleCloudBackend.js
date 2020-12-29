(function () { //
	var obj =  function (env, pkg, req, res) {
		let fs = require('fs'),
			exec = require('child_process').exec,
			CP = new pkg.crowdProcess(),
			me = this;

		me.askBackendStatus = (data) => {
			const _f = {};
			_f['localScripts'] = (cbk) => {
				const dirTree = pkg.require(env.root + '/vendor/directory-tree/node_modules/directory-tree');
				const tree = dirTree(env.appFolder + '/mainServer');
				cbk((!tree) ? null : tree.children);
			}
			_f['scheduledTasks'] = (cbk) => {
				const dirTree = pkg.require(env.root + '/vendor/directory-tree/node_modules/directory-tree');
				const tree = dirTree(env.dataFolder + '/scheduledTasks');
				cbk((!tree) ? (env.dataFolder + '/scheduledTasks') : tree.children);
			}
			_f['logs'] = (cbk) => {
				const dirTree = pkg.require(env.root + '/vendor/directory-tree/node_modules/directory-tree');
				const tree = dirTree(env.dataFolder + '/_log');
				cbk((!tree) ? (env.dataFolder + '/_log') : tree.children);
			}
			_f['outputs'] = (cbk) => {
				const dirTree = pkg.require(env.root + '/vendor/directory-tree/node_modules/directory-tree');
				const tree = dirTree(env.dataFolder + '/_output');
				cbk((!tree) ? (env.dataFolder + '/_output') : tree.children);
			}
			CP.serial(_f, (data) => {
				res.send({localScripts : CP.data.localScripts, scheduledTasks : CP.data.scheduledTasks, logs : CP.data.logs, outputs : CP.data.outputs});
			}, 6000);
			
		}
		me.sendHeader = (filetype) => {
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
		me.askLogContent = (data) => {
			const fn = env.dataFolder + '/_log/' + data.fileName;

			fs.stat(fn, function(err, stat) {
				if(err == null) {
					me.sendHeader('');
					res.sendFile(fn);
					/*
					fs.readFile(fn, 'utf-8', (err, data)=> {
						me.sendHeader('');
						res.send((err) ? err.message : data);
					});
					*/
				} else  {
					res.sendFile(env.root  + '/www/page404.html');
				}
			});
		}
		me.askOutput = (data) => {
			const fn = env.dataFolder + '/_output/' + data.fileName;

			fs.stat(fn, function(err, stat) {
				if(err == null) {
					me.sendHeader('');
					res.sendFile(fn);
				} else  {
					res.sendFile(env.root  + '/www/page404.html');
				}
			});
		}

		me.saveTask = (data) => {
			const dirn = env.dataFolder + '/scheduledTasks';
			const dirnCron = env.dataFolder + '/_cron';
			const fn = dirn + ((data.type === 'C') ? '/xe_' : '/xc_') + new Date().getTime() + '.sh';
			const _f = {};
			_f['createDir'] = (cbk) => {
				exec('mkdir -p ' + dirn, {maxBuffer: 1024 * 2048},
					function(error, stdout, stderr) {
						cbk(true);
					}
				)
			}
			_f['writeFile'] = (cbk) => {
				fs.writeFile(fn, data.command, (err) => {
					if (err) {
						cbk(err.message);
					} else {
						cbk(true);
					}
				});
			}
			_f['copyFile'] = (cbk) => {
				if (data.type !== 'C') {
					exec('cp ' + fn + ' ' + dirnCron, {maxBuffer: 1024 * 2048},
						function(error, stdout, stderr) {
							cbk(true);
						});
				} else {
					// const cmd = 'echo "' + data.schedule + ' root (sh ' + fn + ') >> ' + env.dataFolder + '/_log/cron.log" >> /etc/cront ';
					const cmd = 'echo "_log/cron.log" >> /etc/cront1 ';
					exec(cmd, {maxBuffer: 1024 * 2048},
						function(error, stdout, stderr) {
							cbk(`stdout: ${stdout}`);
						});
				}
			}

			CP.serial(_f, (data) => {
				res.send(CP.data['copyFile']);
			}, 12000);
		}
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
