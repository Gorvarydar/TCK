const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app:'./src/app.js', 
        main:'./src/main.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public'),
        // filename: "bundle.[chunkhash].js",
        assetModuleFilename: './assets/img/[name][ext]'
    },
    devServer: {
        port: 3088
    },
    plugins: [
        new HTMLPlugin({
            filename: "index.html",
            template: './src/index.html'
        }),
        new HTMLPlugin({
            filename: 'main.html',
            template: './src/main.html'
          }),
        
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',
            }
        ],
    },
    experiments: {
        // asyncWebAssembly: true,
        // buildHttp: true,
        // layers: true,
        // lazyCompilation: true,
        // outputModule: true,
        // syncWebAssembly: true,
        topLevelAwait: true,
      },
}