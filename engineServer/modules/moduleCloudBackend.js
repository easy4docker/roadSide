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
				cbk(tree);
			}
			cp.serial(_f, (data) => {
				res.send({localScripts : cp.data.localScripts});
			}, 6000);
			
		}
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
