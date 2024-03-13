const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// crear server de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

// directorio publico
app.use( express.static('public') );


// lectura y parseo del body
app.use( express.json() );

// rutas
//* auth // crear, login, renew
app.use('/api/auth', require('./routes/auth') );

// todo: CRUD: eventos
app.use('/api/events', require('./routes/events') );


// escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});

