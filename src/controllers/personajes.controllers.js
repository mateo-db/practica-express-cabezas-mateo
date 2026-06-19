//importamos fuente de arreglo
import {personajes} from "../data/personajes.js"


//comunicamos el arreglo con la BD | creamos controlador acá
export const getAllPj = (req, res) => {
    res.json(personajes)
    
}

//función controladora que, guiandose por sus parametros que son request y response, va a guardar el id que venga en el objeto params del objeto request (tambien convertirlo a numerico ya que lo que nos llega no es un numero sino un string), luego va a buscar en el arreglo uno por uno los personajes y devolverá el id (con el resto del personaje) que hizo match con el id del params  
export const getPjById = (req, res) => {
    const idPjIncoming = Number(req.params.id)

    //verificamos si el id es un numero válido con el metodo Number.isNaN
    if (Number.isNaN(idPjIncoming)) {
        res.status(400).json({
            message: `Error: id inválido`
        })
    }

    const idPjFound = personajes.find((personaje) => {
        return personaje.id === idPjIncoming
    } )
    //luego va a verificar, si despues de todo eso, no se encontró un pj en el arreglo que haga match con ese id entrante que vino en el params del req, arrojará un response con el http status 404 (not found) y al mismo tiempo un res json con mensaje descriptivo de error
    if (!idPjFound) {
        return res.status(404).json({
            message: `Error: no se encontró personaje con id #${idPjIncoming}`
        })
    }
    //response status 200 (0K) y res json con objeto que contiene: {message: string}, y {idPjFound}
    res.status(200).json({
        message: `Se encontró personaje con id #${idPjIncoming}`,
        idPjFound,
    })
}

