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

//funcion controladora para crear los pj y agregarlos al arreglo
export const createPj = (req, res) => {
    //guardamos el nombre e imagen que vienen desde el body del request en variables descriptivas
    const namePjIncoming = req.body.nombre
    const imgPjIncoming = req.body.imagen

    //if que evalua si el nombre viene vacio o si no es de tipo string, si verifica que se cumplen algunos de esos errores, arroja un codigo status 400 (bad request) y un res json con un message de error, se le agrega un return al principio de lo anterior para cortar la función ahí
    if (!namePjIncoming || typeof namePjIncoming !== "string") {
        return res.status(400).json({
            message: "Error: dato inválido o campo vacío"
        })
    }

    //lo mismo que arriba esencialmente
    if (!imgPjIncoming || typeof imgPjIncoming !== "string") {
        return res.status(400).json({
            message: "Error: imagen inválida o campo vacío"
        })
    }
    
    //se usa el metodo map para recorrer el arreglo de personajes, fijarse en cada uno y extraer su id, para luego formar un arreglo nuevo del mismo tamaño solo con los ids de cada personaje del arreglo, ese nuevo arreglo lo guardamos en una variable
    const idList = personajes.map((personaje) => personaje.id)

    //se usa metodo math.max para identificar el id más alto en el arreglo hasta ese momento, combinado con el operador js "spread operator" (los tres puntitos (...) antes del arreglo), ya que el metodo Math.max no funciona con arreglos sino con numeros sueltos, lo que hace spread operator es romper la estructura de los corchetes y dejar los numeros "sueltos", el resultado de esas operaciones se guardará en variable idMax
    const idMax = Math.max(...idList)
    //luego de identificar el id mas alto hasta ese momento, se le suma 1 y se guarda como id del personaje que se agregara al arreglo
    const newIdPjIncoming = idMax+1
    //lo que pasa en esta secuencia: 
    // arreglo og (5 pjs) => a través del metodo map se extraen los ids de cada personaje del arreglo y se arma un nuevo arreglo del mismo tamaño solo con esos ids => a ese nuevo arreglo se le extraen los ids y se dejan como numeros sueltos (1, 2, 3, 4, 5) para que el metodo math.max calcule el numero (id) más alto hasta ese momento (en este caso, 5) => a ese numero más alto (5) se le suma uno (5+1 = 6) y se guarda como id del nuevo personaje del arreglo
    //esto pasará cada vez que la función se ejecute: 
    // 1. se recorre arreglo para extraer ids 
    // 2. se hace nuevo arreglo del mismo tamaño con esos ids (1, 2, 3, 4, 5, x..) 
    // 3. ese arreglo se rompe y los ids numericos se convierten en numeros sueltos
    // 4. se calcula el mayor de esos numeros sueltos
    // 5. se suma 1 a ese numero
    // 6. se guarda ese resultado como id del nuevo pj del arreglo
    
    //armamos el objeto que representará a nuestro nuevo personaje
    const newPj = {
        id: newIdPjIncoming,
        nombre: namePjIncoming,
        imagen: imgPjIncoming,
    }
    
    //agregamos a nuestro nuevo pj al arreglo mediante el metodo push y arrojamos http status y mensaje de exito
    personajes.push(newPj)
    res.status(201).json({
        message: "Se ha creado y añadido a su personaje con éxito",
        newPj
    })
}