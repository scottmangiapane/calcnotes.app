const JavaScriptObfuscator = require('webpack-obfuscator');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const mode = process.env.NODE_ENV || 'development'

const config = {
    mode,
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

module.exports = () => {
    if (mode === 'production') {
        config.plugins.push(
            new JavaScriptObfuscator({
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 1,
                debugProtection: true,
                disableConsoleOutput: true,
                rotateStringArray: true,
                selfDefending: true,
                stringArray: true,
                stringArrayEncoding: true,
                stringArrayThreshold: 1,
                target: 'node'
            })
        );
    }
    return config;
}