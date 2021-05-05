import { Router } from "express";

/* Controller usuarios */

const { getUsuarios } = require('../controllers/usuarios.controllers')



const router = Router();

/*

    Ruta: /api/usuarios

*/

/* Rutas con controladores */
router.get('/', getUsuarios);






export default router;