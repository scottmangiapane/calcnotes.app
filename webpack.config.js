const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'production',
    entry: './src/render.js',
    output: {
        path: __dirname + '/build',
        publicPath: 'build/',
        filename: 'build.js'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    target: "electron-renderer"
};