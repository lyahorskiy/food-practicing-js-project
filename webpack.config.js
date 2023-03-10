const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        filename: path.resolve(__dirname, "./js/script.js")
    },

    output: {
        path: path.resolve(__dirname, "dist/js"),
        filename: 'bundel.js'
    },
    watch: true,
    devtool: 'source-map',

    devServer: {
        port: 5050,
        compress: true,
        hot: true,
        static: {
            directory: path.join(__dirname, 'dist')
        }
    },

    module: {
        rules: [
            {
            test: /\.css$, \.txt$/i,
            use: ['style-loader', 'css-loader', 'less-loader', 'raw-loader' ]
            }
        ]
    }
};
