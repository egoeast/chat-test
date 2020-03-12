const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

//const VuePwaPlugin = require('@vuepress/plugin-pwa/index')

module.exports = {
    mode: 'development',
    //mode: 'production',
    entry: {
        app: './frontend_vue/index.js',
        test: './test_vue/index.js',
        adminApp: './backend_vue/index.js',
    },
    output: {
            filename: '[name].js',
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
        /*new HtmlWebpackPlugin({
           title: 'Progressive Web Application',
        }),*/
        new WorkboxPlugin.GenerateSW({
           // these options encourage the ServiceWorkers to get in there fast
           // and not allow any straggling "old" SWs to hang around
               clientsClaim: true,
           skipWaiting: true,
         }),
    ],
    watch: true,
    devServer: {
        contentBase: './public/js',
        hot: true,
    }


};



