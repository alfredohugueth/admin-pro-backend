import { Router } from "express";

/* Controller usuarios */

const { getUsuarios, crearUsuarios } = require('../controllers/usuarios.controllers')



const router = Router();

/*

    Ruta: /api/usuarios

*/

/* Rutas con controladores */
router.get('/', getUsuarios);
router.post('/', crearUsuarios);






export default router;