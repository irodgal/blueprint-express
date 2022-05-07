'use strict';

const express = require('express');
const http = require('http');


//tenemos una peticion inicial que llega a nuestro express, 
// y este genera otra prequest que va a otro sitio
// req() -> express -> reqiOpts() -> XXX (http...)

const forwardHandler = (req, res) => {
    // Configure the forwarded request

    // esta sera la request "del medio"
    const reqOpts = {
        headers: req.headers,
        hostname: 'localhost', // a donde va
        method: req.method,
        path: '/forward/mockUri', // a que path va
        port: 3300, // a que puerto
        protocol: 'http:'
    };
    // esto se podria hacer de forma dinamica (req.uri tra la infdo)



    console.log(reqOpts);
    // The connector request will propagate the body
    // headers and query params to the target site
    // On completion, it will forward the response to
    // the original response.

    // se puede hacer con axios, aunque Dani dice que esta es la mejor rendiemiento
    const connector = http.request(reqOpts, (response) => {
        // response.writeHead(res.statusCode, res.headers);
        console.log('hola tiopelele');

        // engancha la response de la intermedia a la respuesta de la primera
        // es configuracion
        response.pipe(res).on('error', console.error);
    });

    // Pipe the original request into the connector
    // engancha la req intermedia a la req primera
    req.pipe(connector).on('error', console.error);

    //es como si se hiciera la reves: primero configurar la req intermedia, enganchar la res intermedia a la res original 
    // y cuando ya este todo listo, enganchar la req intemedia a la req primera
};

const mockHandler = (req, res) => {
    console.log('Received request!');
    console.log('Headers', req.headers);
    console.log('Query params', req.query);
    console.log('Path params', req.params);

    res.json({message: 'Hello forward!'});
};

const router = express.Router();
router.get('/mockUri', mockHandler);
router.use('*', forwardHandler);

module.exports = router;
