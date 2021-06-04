/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import winston from 'winston'

import indexRouter from '@s-routes/index';
import usersRouter from '@s-routes/users';

// Importing configurations
import configTemplateEngine from '@s-config/template-engine';

// Webpack Modules
import webpack from 'webpack';
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "../webpack.dev.config";

// Consultar el modo en que se esta ejecutando la aplicacion
const env = process.env.NODE_ENV || "development";
const app = express();

// Verificando el modo de ejecucion de la aplicacion
if (env === "development") {
  console.log("> Executing in Development Mode: Webpack Hot reloading");
  // Paso1. Agregando la ruta del HMR
  // reload= true: habilita la recarga del frontend cuando hay cambios en el codigo
  // fuente del front end
  // timeout=1000: es el tiempo de espera entre careg y recarega de la pagina
  webpackConfig.entry = [
    "webpack-hot-middleware/client?reload=true&timeout=1000",
    webpackConfig.entry,
  ];

  // Paso 2
  // Agregamos el plugin
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  // Paso 3. Crear el compilador de webpack
  const compiler = webpack(webpackConfig);

  // Paso 4. Agregando el Middleware a la cadena de Middlware
  // de nuestra aplicacion
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    })
  );
  // Paso 5. Agregar el webpack Hot Middleware
  app.use(webpackHotMiddleware(compiler));
} else {
  console.log("> Ejecucion en modo produccion");
}

// view engine setup
configTemplateEngine(app);


app.use(morgan('combined', {stream: winston.stream}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
