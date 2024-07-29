const HtmlWebpackPlugin = require('html-webpack-plugin');
<<<<<<< HEAD
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
=======
>>>>>>> a30a21f (init and map)
const path = require('path');

module.exports = (env, argv) => {
    const production = argv.mode === 'production';

    return {
<<<<<<< HEAD
        entry: './src/scripts/index.js',
        module: {
            rules: [
                {
                    test: /\.(png|jpg|gif)$/i,
                    type: 'asset/resource',
                },
                {
=======
        entry: './src/index.js',
        module: {
            rules: [
                {
>>>>>>> a30a21f (init and map)
                    test: /\.css/,
                    use: [
                        production
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        'css-loader',
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        production
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
<<<<<<< HEAD
                {
                    test: /\.(json|geojson)$/,
                    type: 'json',
                },
=======
>>>>>>> a30a21f (init and map)
            ],
        },
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'HUSD Districting Map Viewer',
                template: './src/template.html',
            }),
<<<<<<< HEAD
            new MiniCssExtractPlugin(),
=======
>>>>>>> a30a21f (init and map)
        ],
    };
};
