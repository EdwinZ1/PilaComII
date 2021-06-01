/* eslint-disable prettier/prettier */
import Exphbs from 'express-handlebars';
import path from 'path';
// Exportando una funcion de configuracion
export default (app) => {
  // 1.Registrar el motor de plantillas
  app.engine(
    'hbs',
    Exphbs({
      extname: '.hbs',
      defaultLayout: 'main',
    }),
  );
  // 2. Seleccionar el motor de plantillas recien registrado
  app.set('view engine', 'hbs');
  // 3. Estableciedno la  ruta de las vistas
  app.set('views', path.join(__dirname, '..', 'views'));
  // Retonarmos el valor de entrada
  return app;
};
