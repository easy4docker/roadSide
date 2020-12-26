(function () { //
	var obj =  function (env, pkg, req, res) {
		let fs = require('fs'),
			exec = require('child_process').exec,
			CP = new pkg.crowdProcess(),
			me = this;

		this.askBackendStatus = (data) => {
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
				cbk(null);
			}
			CP.serial(_f, (data) => {
				res.send({localScripts : CP.data.localScripts, scheduledTasks : CP.data.scheduledTasks});
			}, 6000);
			
		}
		this.saveTask = (data) => {
			const dirn = env.dataFolder + '/scheduledTasks';
			const fn = dirn + '/onetime_' + new Date().getTime() + '.sh';
			exec('mkdir -fr ' + dirn, {maxBuffer: 1024 * 2048},
                function(error, stdout, stderr) {
					fs.writeFile(fn, data.command, (err,data) => {
						if (err) {
							res.send(err.message);
						} else {
							res.send(data);
						}
            		});
			});	
		}
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
