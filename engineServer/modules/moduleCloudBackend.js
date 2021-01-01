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
				res.send({
					localScripts : CP.data.localScripts, 
					scheduledTasks : CP.data.scheduledTasks, 
					logs : CP.data.logs, 
					outputs : CP.data.outputs
				});
			}, 6000);
			
		}
		me.removeCron = (data) => {
			const _f = {};
			_f['deleteFile'] = (cbk) => {
				const fn = env.dataFolder + '/scheduledTasks/' + data.fileName;
				exec('rm -fr ' + fn, {maxBuffer: 1024 * 2048},
				function(error, stdout, stderr) {
					cbk(true);
				});
			}
			_f['removeCron'] = (cbk) => {
				let cmd = 'sed /' + data.fileName.replace(/[-\/\\^$*+?.()|[\]{}_]/g, '\\$&') + '/d /etc/crontab > /etc/tmp_crontab';
				cmd += ' && cp -f /etc/tmp_crontab /etc/crontab && rm /etc/tmp_crontab';

				const fnc = env.dataFolder + '/_cron/xc_' + new Date().getTime() + '.sh';
					
				fs.writeFile(fnc, cmd, (errp) => {
					cbk(true);
				});
			}

			CP.serial(_f, (data) => {
				res.send({status : 'success', cmp : CP.data.removeCron});
			}, 6000);
		}
		me.deleteFile = (data) => {
			switch (data.type) {
				case 'log':
					const fn = env.dataFolder + '/_log/' + data.fileName;
					exec('rm -fr ' + fn, {maxBuffer: 1024 * 2048},
					function(error, stdout, stderr) {
						res.send({status : 'success'});
					});
					break;
				default:
					res.send({status : 'failure', message : 'Missing or wrong type!'});
			}
		}

		me.pullGitCode = (data) => {
			exec('cd ' + env.appFolder + ' && git pull', {maxBuffer: 1024 * 2048},
			function(error, stdout, stderr) {
				res.send({status : 'success'});
			});
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
		me.loadFileContent = (data) => {
			var folderName = (data.fileType == "log") ? '/_log/' : '/scheduledTasks/'; 
			const fn = env.dataFolder + folderName + data.fileName;

			fs.stat(fn, function(err, stat) {
				if(err == null) {
					me.sendHeader('');
					res.sendFile(fn);
				} else  {
					res.sendFile(env.root  + '/www/page404.html');
				}
			});
		}

		me.askLogContent = (data) => {
			const fn = env.dataFolder + '/_log/' + data.fileName;

			fs.stat(fn, function(err, stat) {
				if(err == null) {
					me.sendHeader('');
					res.sendFile(fn);
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

			const _f = {};
			_f['createDir'] = (cbk) => {
				exec('mkdir -p ' + dirn, {maxBuffer: 1024 * 2048},
					function(error, stdout, stderr) {
						cbk(true);
					}
				)
			}
			_f['createDirnCron'] = (cbk) => {
				exec('mkdir -p ' + dirnCron, {maxBuffer: 1024 * 2048},
					function(error, stdout, stderr) {
						cbk(true);
					}
				)
			}
			
			_f['copyFile'] = (cbk) => {
				if (data.type !== 'C') {
					const fn = dirnCron + '/xc_' + new Date().getTime() + '.sh';
					fs.writeFile(fn, data.command, (err) => {
						if (err) {
							cbk(err.message);
						} else {
							cbk(true);
						}
					});
				} else {
					const fnc = dirnCron + '/xe_' + new Date().getTime() + '.sh';
					const fnp0 = 'xp_' + new Date().getTime() + '.sh';
					const fnp = dirn + '/' + fnp0;

					let cron_shell = 'echo "=== CRON RUN $(date +"%m-%d %H:%M:%S") ===' + '" >> ' + env.dataFolder + '/_log/cron.log' + " ===\n";
					cron_shell += 'cd /var/_localApp'+ "\n";
					cron_shell += data.command + " >> " + env.dataFolder + '/_log/cron.log'+ "\n";
					cron_shell += 'echo "\tCRON Done $(date +"%m-%d %H:%M:%S") '  + '" >> ' + env.dataFolder + '/_log/cron.log' + "\n\n";

					let cmd = 'echo "Add cron job ' + fnp0 + '" && ';
					cmd += 'echo "' + data.schedule + ' root (sh ' +  fnp + ')" >> /etc/crontab ';
					 
					fs.writeFile(fnp, cron_shell, (errp) => {
						fs.writeFile(fnc, cmd, (err) => {
							if (err) {
								cbk(err.message);
							} else {
								cbk(true);
							}
						});
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
