'use strict';

const express = require('express');
const axios = require('axios');

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

const SERVICE1_URL = 'http://localhost:3331/service1';
const SERVICE2_URL = 'http://localhost:3332/service2';


// endpoints
const getInfoMesh = async (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    if (!id) {
        // res.sendStatus(400);
        console.log('No id param');
        res.status(400).json({error: 'No id param'});
    } else {
        const uris = [];
        uris.push(SERVICE1_URL + '/' + id);
        uris.push(SERVICE2_URL + '/' + id);
        const requests = uris.map((uri) => axios.get(uri));
    
    
        try {
            const responses = await Promise.all(requests);
            /*
            const result = {
                service1: responses[0].data,
                service2: responses[1].data,
            };
            */
            const result = [];
            for (const indexResponse in responses) {
                const response = responses[indexResponse];  
                console.log(response.data);
                result.push(response.data);
            }
        
    
            res.status(200).json(result);
        } catch (error) {
            const errorObject  = {
                url: error.response.config.url,
                method: error.response.config.method,
                status: error.response.status,
                statusText: error.response.statusText
            };
            console.log('Error en alguna de las peticiones', errorObject);
            res.status(500).json({error: errorObject});
        }
    }


    

    
};
app.get('/infoMesh/:id', getInfoMesh);

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
