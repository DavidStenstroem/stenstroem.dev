const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = (env, options) => {
  const isProduction = options.mode === 'production'

  const setup = {
    entry: './src/index.tsx',
    output: {
      path: path.join(__dirname, './dist'),
      publicPath: '/',
      filename: isProduction ? '[name].[hash].js' : '[name].js',
      chunkFilename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
    devtool: isProduction ? false : 'cheap-module-eval-source-map',
    devServer: {
      clientLogLevel: 'warning',
      hot: true,
      overlay: {
        warnings: false,
        errors: true,
      },
      publicPath: '/',
      historyApiFallback: true,
      port: 8000,
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
        {
          test: /\.js$/,
          use: ['babel-loader', 'source-map-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.tsx?$/,
          loader: ['babel-loader', 'awesome-typescript-loader'],
        },
        {
          test: /\.(ttf|woff2?|eot|svg|png|jpe?g|gif)$/i,
          loader: 'url-loader',
          options: {
            limit: 25000,
          },
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        hash: isProduction,
        inject: true,
        favicon: './src/images/favicon.ico',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(options.mode),
      }),
    ],
  }

  if (isProduction) {
    setup.optimization = {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
            compress: {
              drop_console: true,
            },
          },
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
    }
  } else {
    setup.plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  return setup
}
