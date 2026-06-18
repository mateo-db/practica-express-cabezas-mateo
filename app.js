//importamos el framework web de express
import express from 'express';
//declaramos variable app como constante donde guardamos express como funcion para traer sus herramientas
const app = express()
//sumamos middleware json() para traducir a json las peticiones que va a leer el servidor
app.use(express.json())
//guardamos nro de puerto en una variable
const PORT = 3000
//le indicamos a nuestro servidor que puerto escuchar (le pasamos como parametro la variable donde guardamos el nro de puerto)
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

//importamos enrutador de pjs
import routePj from "./src/routes/personajes.routes.js"
//le decimos a express (app) que active/tome/use la ruta
app.use(routePj)