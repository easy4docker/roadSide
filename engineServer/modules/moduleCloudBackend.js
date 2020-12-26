(function () { //
	var obj =  function (env, pkg, req, res) {
		let fs = require('fs');
		let me = this;

		this.askBackendStatus = (data) => {
			const cp = new pkg.crowdProcess();
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
			cp.serial(_f, (data) => {
				res.send({localScripts : cp.data.localScripts, scheduledTasks : cp.data.scheduledTasks});
			}, 6000);
			
		}
		this.saveTask = (data) => {
			const fn = env.dataFolder + '/scheduledTasks/' + 'onetime_' + new Date().getTime() + '.sh';
			fs.writeFile(fn, data.command, (err,data) => {
				if (err) {
					res.send(err.message);
				} else {
					res.send(data);
				}
			});	
		}
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
