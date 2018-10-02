const path = require('path');

module.exports = {
    mode: 'development',
    //mode: 'production',
    entry: './frontend/index.js'
    ,
    output: {
            filename: 'build.js',
            path: path.resolve(__dirname, 'public/js')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    watch: true

};



