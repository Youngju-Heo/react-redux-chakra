import path from 'path';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const config: Configuration = {
  mode: 'development',
  output: {
    publicPath: '/ds-system/app',
  },
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/assets', to: 'assets' }],
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, 'build'),
    historyApiFallback: {
      index: "/ds-system/app/",
    },
    port: 3000,
    open: true,
    hot: true,
    proxy: {
      "/dms-gis-proxy": { changeOrigin: true, target: "http://ca-172-16-36-180.vurix.kr" },
      "/dms-gis": { changeOrigin: true, target: "http://ca-172-16-36-180.vurix.kr" },
      "/emaphd": { changeOrigin: true, target: "http://ca-172-16-36-180.vurix.kr" },
      "/media": { changeOrigin: true, target: "http://ca-172-16-36-180.vurix.kr" },
      "/ds-system/api": { changeOrigin: true, target: "http://localhost:8080" },
    }
  },
};

export default config;
