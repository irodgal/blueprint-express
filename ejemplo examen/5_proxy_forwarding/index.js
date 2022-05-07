'use strict';

const express = require('express');
const http = require('http');
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


// PUES CON http.request no consigiuop eque esto chute...
const forwarding = async (req, res) => {
    // pilla mayusculas
    const src = req.query['SRC']; //service1
    const port = req.query['PORT']; //3331

    if (!src || !port) {
        console.log('Error: no SRC or no PORT queryparam');
        res.status(400).send('Error: no SRC or no PORT queryparam');
    } else {
        /*
        console.log('Received request!');
        console.log('Headers', req.headers);
        console.log('Query params', req.query);
        console.log('Path params', req.params);

        
        */
        // esta sera la request "del medio"
        /*
        const reqOpts = {
            headers: req.headers,
            hostname: 'localhost', // a donde va
            method: req.method,
            path: src, // a que path va
            port: port, // a que puerto
            protocol: 'http:'
        };
        */
       console.log('1');

        req.headers['MY-HEADER'] = 'la_mia';

        const axiosReq = `http://localhost:${port}/${src}`;
        console.log(axiosReq);
        const responseAxios = await axios.get(axiosReq, {headers: req.headers});

        console.log('HOLA2');
        console.log(responseAxios.headers);


        res.set('kakakak', 'pepepe')

        // PAra añadir las cabeceras de la response del formwarding
        for (const key in responseAxios.headers) {
            const element = responseAxios.headers[key];
            console.log(element);
            res.set(key, element);
        }

        // console.log(res.headers);
        

        res.status(200).json(responseAxios.data);


        /*
        // The connector request will propagate the body
        // headers and query params to the target site
        // On completion, it will forward the response to
        // the original response.

        // try {
            // se puede hacer con axios, aunque Dani dice que esta es la mejor rendiemiento
            console.log('esto es lo que se pasa al htttp.request: ', reqOpts)


            const connector = http.request(reqOpts, (response) => {
                    console.log('DENTRO DE LA PUTA RESPUESTA');
                // pues esto no chuta :-O
                // response.writeHead(res.statusCode, res.headers);
 

                // compartir las headers de la respuesta :-O


                // engancha la response de la intermedia a la respuesta de la primera
                // es configuracion
                response.pipe(res).on('error', (error) => {
                    console.log('errorITO!!!!', error);
                    res.status(500).json(error);
                })

            });

            // Pipe the original request into the connector
            // engancha la req intermedia a la req primera
            req.pipe(connector).on('error', console.error);

            //es como si se hiciera la reves: primero configurar la req intermedia, enganchar la res intermedia a la res original 
            // y cuando ya este todo listo, enganchar la req intemedia a la req primera


            */
       /*
        } catch (error) {
            console.log('errorAZO!!!!', error);
            res.status(500).json(error);
        }

        */
        
    }

    
};

// endpoints
app.get('/forwarding', forwarding);


const forwarding2 = (req, res) => {
    console.log('forwarding21');
    // pilla mayusculas
    const src = req.query['SRC']; //service1
    const port = req.query['PORT']; //3331

    if (!src || !port) {
        console.log('Error: no SRC or no PORT queryparam');
        res.status(400).send('Error: no SRC or no PORT queryparam');
    } else {
        console.log('1');

        // esta sera la request "del medio"
        const reqOpts = {
            headers: req.headers,
            hostname: 'localhost', // a donde va
            method: req.method,
            path: src, // a que path va
            port: port, // a que puerto
            protocol: 'http:'
        };

        

        console.log('esto es lo que se pasa al htttp.request2222: ', reqOpts);

        const connector = http.request(reqOpts, (response) => {
            console.log('HOLA');
            console.log(response.data);

            response.pipe(res).on('error', (error) => {
                console.log('errorITO!!!!', error);
                res.status(500).json(error);
            })
        });

        req.pipe(connector).on('error', console.error);
        

    }
};
app.get('/forwarding2', forwarding2);


// app.use('*', forwarding);

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
