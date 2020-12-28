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
				cbk((!tree) ? (env.dataFolder + '/log') : tree.children);
			}
			CP.serial(_f, (data) => {
				res.send({localScripts : CP.data.localScripts, scheduledTasks : CP.data.scheduledTasks, logs : CP.data.logs});
			}, 6000);
			
		}
		me.askLogContent = (data) => {
			res.send(data);
		}
		me.saveTask = (data) => {
			const dirn = env.dataFolder + '/scheduledTasks';
			const dirnCron = env.dataFolder + '/_cron';
			const fn = dirn + '/onetime_' + new Date().getTime() + '.sh';
			const _f = {};
			_f['createDir'] = (cbk) => {
				exec('mkdir -p ' + dirn, {maxBuffer: 1024 * 2048},
					function(error, stdout, stderr) {
						cbk(true);
					}
				)
			}
			_f['writeFile'] = (cbk) => {
				fs.writeFile(fn, data.command, (err,data) => {
					if (err) {
						cbk(err.message);
					} else {
						cbk(data);
					}
				});
			}
			_f['copyFile'] = (cbk) => {
				exec('cp ' + fn + ' ' + dirnCron, {maxBuffer: 1024 * 2048},
					function(error, stdout, stderr) {
						cbk(true);
					}
				)
			}

			CP.serial(_f, (data) => {
				res.send(CP.data['writeFile']);
			}, 6000);
		}
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
