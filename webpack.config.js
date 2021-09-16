module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: __dirname,
    libraryTarget: 'commonjs',
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
