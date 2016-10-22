var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var failPlugin = require('webpack-fail-plugin');

var path = require('path');
var CURRENT_PATH = path.resolve(__dirname); // 获取到当前目录
var ROOT_PATH = path.join(__dirname, '../'); // 项目根目录
var MODULES_PATH = path.join(ROOT_PATH, './node_modules'); // node包目录
var BUILD_PATH = path.join(ROOT_PATH, './dist'); // 最后输出放置公共资源的目录
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var pkg = require(path.resolve(__dirname, './package.json'));


module.exports = {

    //项目的文件夹 可以直接用文件夹名称 默认会找index.js ，也可以确定是哪个文件名字
    entry: {
        app: ['./src/js/index.js'],
        vendors: ['jquery', 'moment'], //需要打包的第三方插件
        // login:['./src/css/login.less']
    },

    //输出的文件名,合并以后的js会命名为bundle.js
    output: {
        path: path.join(__dirname, "dist/"),
        publicPath: "http://localhost:8088/dist/",
        filename: "bundle_[name].js"
    },
    devServer: {
        historyApiFallback: true,
        contentBase: "./",
        quiet: false, //控制台中不输出打包的信息
        noInfo: false,
        hot: true, //开启热点
        inline: true, //开启页面自动刷新
        lazy: false, //不启动懒加载
        progress: true, //显示打包的进度
        watchOptions: {
            aggregateTimeout: 300
        },
        port: '8088', //设置端口号
        //其实很简单的，只要配置这个参数就可以了
        proxy: {
            '/index.php': {
                target: 'http://localhost:80/index.php',
                secure: false
            }
        }

    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: [/node_modules/,/dist/],
            loader: 'jshint-loader'
        }],
        loaders: [
            // 把之前的style&css&less loader改为
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader'),
                exclude: /node_modules/

            }, {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin
                    .extract('style', 'css!autoprefixer?{browsers: ["last 2 version", "IE 8", "Android 4.0", "iOS 6"]}!less?strictMath&noIeCompat!postcss')
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                exclude: /node_modules/,
                loader: 'url?limit=8092'
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ['babel-loader'],
                query: {
                    'presets': ['es2015'],
                    'plugins': [
                        'transform-es3-property-literals',
                        'transform-es3-member-expression-literals'
                    ]
                }
            }
        ]
    },
    postcss: function() {
        return [require('postcss-fixes')({ preset: 'recommended' })]
    },
    // more options in the optional jshint object
    jshint: {
        // any jshint option http://www.jshint.com/docs/options/
        // i. e.
        camelcase: true,

        // jshint errors are displayed by default as warnings
        // set emitErrors to true to display them as errors
        emitErrors: false,

        // jshint to not interrupt the compilation
        // if you want any file with jshint errors to fail
        // set failOnHint to true
        failOnHint: false,

        // custom reporter function
        reporter: function(errors) { }
    },
    plugins: [
        failPlugin,
        //new webpack.HotModuleReplacementPlugin()
        //提取公共部分资源
        new webpack.optimize.CommonsChunkPlugin({
            // 与 entry 中的 vendors 对应
            name: 'vendors',
            // 输出的公共资源名称
            filename: 'common.bundle.js',
            // 对所有entry实行这个规则
            minChunks: Infinity
        }),
        // 把jquery作为全局变量插入到所有的代码中
        // 然后就可以直接在页面中使用jQuery了
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        //生成index.html页面
        new HtmlWebpackPlugin({
            title: '68kejian',
            filename: 'index.html',
            template: 'header.html',
            inject: 'body',
            // favicon:'./images/favico.ico',
            minify: false,
            hash: false,
            cache: false,
            showErrors: false

        }),
        // 分离css
        new ExtractTextPlugin('[name].bundle.css', {
            allChunks: false
        }),
        new CopyWebpackPlugin([
            { from: './src/images' }

        ])
    ],
    externals: {
        // require('data') is external and available
        //  on the global var data
        'data': 'data'
    },
     resolve: {
        root: [
            path.resolve('./src')
        ],
        modulesDirectories: ['node_modules']
    },
    devtool: 'source-map',
    jshint: pkg['jshintConfig'] // This is the actually fix


};