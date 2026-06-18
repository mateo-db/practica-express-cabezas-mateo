//importamos fuente de arreglo
import {personajes} from "../data/personajes.js"


//comunicamos el arreglo con la BD | creamos controlador acá
export const getAllPj = (req, res) => {
    res.json(personajes)
    
}