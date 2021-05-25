const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  //0. Establecer el modo Developer
  mode: 'development',
  // 1. Especificando el archivo de entrada
  entry: './client/index.js',
  // 2. Especificando la salida
  output: {
    path: path.join(__dirname, 'public'),
    //4. Nombre del archivo de salida
    filename: 'js/bundle.js',
    //5. Ruta del path publica para fines del servidor de desarrollo
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    'modules': false,
                    'useBuiltIns': 'usage',
                    'targets': '> 0.25%, not dead', //para el front
                    'corejs': 3
                  }
                ]
              ],
              "plugins": [
                [
                  //Alias para las rutas
                  "module-resolver",
                  {
                    "root": ["./"],
                    "alias": {
                      "@client": "./client",
                    }
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style/app.css'
    })
  ]
}