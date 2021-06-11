/* eslint-disable prettier/prettier */
// Importando Router
import { Router } from 'express';
// Importando al controlador Home
import homeController from '@server/controllers/homeControllers';
// Creando la instancia de un router
const router = new Router();
// GET '/'
router.get('/', homeController.index);

// Get '/greeeting'
router.get('/greeting', homeController.greeting)
// Exportando el router que maneja las subrutas
// Para el controlador Home
export default router;
