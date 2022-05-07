'use strict';

const express = require('express');
const path = require('path');

// los 2 primeros son 'node'  y el path donde se lanza
var args = process.argv.slice(2);
let port = 0;

// esto chuta si es 'node scriptjs PORT=XXXX'
if (args[0]) {
    const paramName = args[0].split('=')[0];
    const paramValue = args[0].split('=')[1];
    if (paramName !== 'PORT') {
        console.log('Error1');
        console.error('No se llama PORT');
        throw new Error('Que no se llama PORT!!!!')
    }
    if (!paramValue) {
        console.log('Error2');
        console.error('No tinee =');
        throw new Error('Que no tinee =!!!!')
    }

    port = paramValue
} else {
    console.log('Error');
    console.error('No se ha pasado ningun parametro');
    throw new Error('Que no  hay parametreos!!!!')
}


// si ha ido todo bine, arrancar


// Allocate an express application
const app = express();
// const port = 3351;

// express configuration
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//__dirname para rutas absolutas
const staticFolder = path.join(__dirname, 'static');
const staticFileHandler = express.static(staticFolder);

// Static folder path
app.use('/public', staticFileHandler);


// Default handler
const defaultHandler = (req, res) => {
    console.log('Not found: ', req.url)
    res.sendStatus(404);
};
app.all('*', defaultHandler);

// Configure exposed port and start listening
app.listen(port, () => {
    console.log(`Application listening on ${port}`);
});

// Configure error handler
app.on('error', (err) => {
    console.error(`Application unable to start on port ${port}`, err);
});
