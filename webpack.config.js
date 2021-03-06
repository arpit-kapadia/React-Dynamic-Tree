var config = {
  entry: './main.js',
  
  output: {
    path: '/',
    filename: 'index.js',
  },

  devServer: {
    inline: true,
    port: 4200,
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties']
        }
      }
    ]
  }
}

module.exports = config;
