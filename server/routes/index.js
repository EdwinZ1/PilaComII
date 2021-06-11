// Importando el Router de Home.js
import homeRouter from './home';
// Importando Router de user.js
import userRouter from './users';
// Agregando las rutas a la aplicacion
const addRoutes = (app) => {
  app.use('/', homeRouter);
  app.use('/user', userRouter);
};
export default {
  addRoutes,
};
