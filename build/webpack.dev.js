const webpack = require('webpack');
const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

function resolve(dir) {
    return path.resolve(__dirname, '../', dir);
}


const NODE_ENV = (process.env.NODE_ENV || 'development').trim();
const isProd = NODE_ENV === 'production';

module.exports = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd? 'none' : '#cheap-module-eval-source-map',
    target: 'web',
    entry: {
        component: [resolve('src/component/index.tsx')],
    },
    output: {
        path: resolve('public/dist/'),
        filename: '[name].min.js',
        sourceMapFilename: '[name].min.map.js',
        //chunkFilename: 'chunk_[name].min.js', 异步加载却又未出现在entry中 即require.ensure
        publicPath: '/dist/'
    },
    resolve: {
        modules: [ //配置webpack去哪些目录下寻找第三方模块。
            resolve('src/'),
            resolve('node_modules'),
        ],
        extensions: ['.ts', '.tsx','.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
              test: /\.ts[x]?$/,
              loader: "awesome-typescript-loader"
            },
            { enforce: "pre", 
              test: /\.ts[x]$/, 
              loader: "source-map-loader" 
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: [resolve('src/')],
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({  //https://www.webpackjs.com/plugins/define-plugin/
            'process.env': isProd? 'production' : 'development', //类似于全局变量
        }),
        new webpack.HashedModuleIdsPlugin({}),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(), // 引入热更新插件(引用react热更新必须设置)，
        new webpack.ProvidePlugin({ // 避免引入React的麻烦
            'React': 'react',
        }),
        new CheckerPlugin(),
    ],
    devServer: {
        contentBase: resolve('public'),
        compress: false,
        hot: true,
        host: '0.0.0.0',
        port: 8180,
    }
}