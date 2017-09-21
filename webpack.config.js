const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './index.js',
  resolve: {
    modules: ['bower_components', 'node_modules'],
    descriptionFiles: ['bower.json'],
  },
  output: {
    filename: 'bundle/bundle.js',
  },
  plugins: [
    new CopyWebpackPlugin([
    { from: 'manifest.json', to: 'bundle/manifest.json' },
    { from: 'main.css', to: 'bundle/main.css' }
    ]),
  ],
};
