const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './src/components/index.js',
    output: {
      filename: 'main.[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9000,
      open: true,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true,
              },
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    'autoprefixer',
                    isProduction ? 'cssnano' : null,
                    'postcss-preset-env'
                  ].filter(Boolean)
                }
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff2?)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[hash][ext][query]'
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.[contenthash].css'
      })
    ]
  };
};