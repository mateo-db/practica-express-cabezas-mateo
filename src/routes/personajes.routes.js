//importar herramienta Router desde framework web express
//siempre que se necesita utilizar una herramienta o recurso que está afuera del archivo en cuestión, se tiene que importar primero arriba de todo
import express from 'express'
import Router from 'express';

//importamos el controlador
import { getAllPj, getPjById, createPj } from '../controllers/personajes.controllers.js';

//guardamos en variable la herramienta en funcionamiento, es decir, inicializamos el enrutador
const router = express.Router()

//enrutamos el pedido de traer todos los pjs, combinando router con metodo http get, y pasandole como parametro al metodo la ruta "/personajes" y la funcion controladora getAllPj
router.get("/personajes", getAllPj)
//preparamos router con metodo get, parametros: parte estática de la URL (/personajes), parte dinámica de la url (/:id), y por ultimo invocacion a la función que trae pj por id
router.get("/personajes/:id", getPjById)
router.post("/personajes", createPj)

export default router 