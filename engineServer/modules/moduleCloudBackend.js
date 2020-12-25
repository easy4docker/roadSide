(function () { //
	var obj =  function (env, pkg, req, res) {
		let fs = require('fs');
		let me = this;

		this.askBackendStatus = (data) => {
			const dirTree = pkg.require(env.root + '/vendor/directory-tree/node_modules/directory-tree');
			const tree = dirTree(env.appFolder + '/mainServer');
			res.send(tree);
		}
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 

})();
