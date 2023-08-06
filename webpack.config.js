const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    process.env.NODE_ENV === 'production' ? {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        }
                    } : {
                        // Adds CSS to the DOM by injecting a `<style>` tag
                        loader: 'style-loader'
                    },
                    {
                        // Interprets `@import` and `url()` like `import/require()` and will resolve them
                        loader: 'css-loader'
                    },
                    {
                        // Loader for webpack to process CSS with PostCSS
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer
                                ]
                            }
                        }
                    },
                    {
                        // Loads a SASS/SCSS file and compiles it to CSS
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    mode: 'development',
    devtool: 'source-map',
    output: {
        clean: true,
    },
    devServer: {
        devMiddleware: {
            writeToDisk: true,
        },
        static: {
            directory: path.resolve(__dirname, 'dist'),
            serveIndex: true,
        },
        port: 8080,
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({ filename: 'index.html', template: './src/index.html' }),
        new CopyPlugin({
            patterns: [
                { from: "./public/**/*", to: "./" },
            ],
        }),
        new MiniCssExtractPlugin(),
    ]
}