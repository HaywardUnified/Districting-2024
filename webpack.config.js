const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env, argv) => {
    const production = argv.mode === 'production';

    return {
<<<<<<< HEAD
<<<<<<< HEAD
        entry: './src/scripts/index.js',
        module: {
            rules: [
                {
                    test: /\.(png|jpg|gif)$/i,
                    type: 'asset/resource',
                },
                {
<<<<<<< HEAD
=======
        entry: './src/index.js',
=======
        entry: './src/scripts/index.js',
>>>>>>> d537c09 (hover effects)
        module: {
            rules: [
                {
>>>>>>> a30a21f (init and map)
=======
>>>>>>> fffa552 (pins)
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
            new MiniCssExtractPlugin(),
        ],
    };
};
