const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
//const VuePwaPlugin = require('@vuepress/plugin-pwa/index')

module.exports = {
    mode: 'development',
    //mode: 'production',
    entry: './frontend_vue/index.js'
    ,
    output: {
            filename: 'build.js',
            path: path.resolve(__dirname, 'public/js')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use:{
                    loader: 'vue-loader',
                    options: {
                        hotReload: true // disables Hot Reload
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: "[local]___[hash:base64:5]"
                        }
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                ]
            }
        ],

    },
    plugins: [
        new VueLoaderPlugin(),
        //new VuePwaPlugin()
    ],
    watch: true,
    devServer: {
        contentBase: './public/js',
        hot: true,
    }


};



