module.exports = {
    entry: './dist/frontend/app.js',
    output: {
        path: './dist/public/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015'],
                plugins: ['./babelRelayPlugin'].map(require.resolve)
            }
        }]
    }
};
