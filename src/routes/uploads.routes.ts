

/*

    ruta: /api/upload/ 
 
 */

import { Router } from "express";
import { check } from 'express-validator'

/* MiddleWares */

import { validarJWT } from "../middlewares/validar-jwt.middleware";
import fileUpload from "express-fileupload";

/* Controller */
import { Upload } from "../controllers/uploads.controllers";

/* Start of the code */

const router = Router();
const uploadController = new Upload();

router.use( fileUpload() );

router.put( '/:tipo/:id', validarJWT, uploadController [ 'fileUpload' ] );

export default router
