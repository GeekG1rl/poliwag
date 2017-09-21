module.exports = {
	entry: './index.js',
	resolve: {
		modules: ['bower_components', 'node_modules'],
		descriptionFiles: ["bower.json"]
	},
	output: {
		filename: 'bundle.js'
	}
}