const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry:'./app.js',
    output:{
        path: path.resolve(__dirname,'dist/'),
        filename:'assets/js/app.js',
        //所以资源的基础路径，并且一定要/结尾
        publicPath: ''              //根据自己的配置进行路径更换
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'index.html'
        }),

        //自动清除dist文件夹
        new CleanWebpackPlugin(['dist']),

        //热更新
        new webpack.HotModuleReplacementPlugin(),

    ],
    module: {
        rules:[
            //js
            {
                test:/\.js$/,
                use:[
                    {
                        loader: "babel-loader",
                        //如果没有写options，会自动查找到.babelrc文件
                        options:{
                            presets:['react','env'],
                            plugins:[]
                        }
                    }
                ],
                exclude:[
                    path.resolve(__dirname,'node_modules')
                ]
            },

            //vue
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },

            //css
            {
                test:/\.css$/,
                use:[
                    'style-loader', //样式css
                    {
                        loader:'css-loader',
                        options:{
                            module:true,
                            localIdentName:'[path]-[name]-[local]-[hash:base64:6]',
                            name:'assets/css/[name]_[hash:8].[ext]'
                        }
                    }
                ],
                //排除下面（例如：boostrap.css等）不开启模块化，其他都开始模块化
                exclude:[
                    path.resolve(__dirname,'node_modules'),
                    path.resolve(__dirname,'src/common')
                ]
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader'],
                //包含
                include:[
                    path.resolve(__dirname,'node_modules'),
                    path.resolve(__dirname,'src/common')
                ]
            },
            // sass
            {
                test:/\.scss$/,
                use:[
                    'style-loader', //样式css
                    {
                        loader:'css-loader',
                        options:{
                            module:true,
                            localIdentName:'[path]-[name]-[local]-[hash:base64:6]'
                        }
                    },
                    'sass-loader'
                ],
                //排除下面（例如：boostrap.css等）不开启模块化，其他都开始模块化
                exclude:[
                    path.resolve(__dirname,'node_modules'),
                    path.resolve(__dirname,'src/common')
                ]
            },
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader'],
                //包含
                include:[
                    path.resolve(__dirname,'node_modules'),
                    path.resolve(__dirname,'src/common')
                ]
            },

            // less
            {
                test:/\.less$/,
                use:[
                    'style-loader', //样式css
                    {
                        loader:'css-loader',
                        options:{
                            module:true,
                            localIdentName:'[path]-[name]-[local]-[hash:base64:6]'
                        }
                    },
                    'less-loader'
                ],
                //排除下面（例如：boostrap.css等）不开启模块化，其他都开始模块化
                exclude:[
                    path.resolve(__dirname,'node_modules'),
                    path.resolve(__dirname,'src/common')
                ]
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader'],
                //包含
                include:[
                    path.resolve(__dirname,'node_modules'),
                    path.resolve(__dirname,'src/common')
                ]
            },
            //图片
            {
                test:/\.(jpg|png|gif|jpeg)$/,
                use:[{
                    loader: "url-loader",
                    options:{
                        limit:20000,     //1kB=1024B，小于约20KB base64的方式
                        name:'assets/img/[name]_[hash:8].[ext]'
                    }
                }]
            },
            //字体图标
            {
                test:/\.(ttf|eot|woff|woff2|svg)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options:{
                            name:'assets/fonts/[name]_[hash:8].[ext]'
                        }
                    }
                ],
            },

            //HTML 文件中的图片资源
            {
                test: /\.html$/,
                use:[
                    {
                        loader: 'html-withimg-loader',
                        options:{
                            limit:20000,     //1kB=1024B，小于约20KB base64的方式
                            name:'assets/img/[name]_[hash:8].[ext]'
                        }
                    }
                ]
            },

            //json数据
            {
                test: /\.json$/,
                use: 'json-loader'
            }


        ],
    },

    devServer: {
        open:true,   //自动打开浏览器
        port:9000,    //替换端口，默认是8080
        contentBase:'./src/common',
        //服务器打包资源后的的路径
        publicPath:'/',
        //hot: true,
        //host: '192.168.2.101',

        historyApiFallback: true,
        inline: true,

        // proxy: {
        //     './': {
        //         target: 'http://192.168.2.101:9000',
        //         changeOrigin: true,
        //         secure: false
        //
        //     }
        // }
    }


};


