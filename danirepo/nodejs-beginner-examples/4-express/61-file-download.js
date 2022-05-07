'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

const fileDownload = (req, res) => {
    // esto lo pillaria de algo como localhost:3000/file?filename=XXX
    const filename = req.query['filename'];

    if (filename) {
        const filename = req.query.filename;
        // Create a read stream on the file to download
        const filePath = path.join(__dirname, filename);
        const readStream = fs.createReadStream(filePath);
        // Add error control
        // los streams no "devuelven datos", son "punteros"; toido lo hacen con eventos
        //suscribirse al evento de error
        // Dani le pasa "res" para poder generar una respuesta, no solo pintar el error (ver mas abajo)
        readStream.on('error', (err) => errorHandler(res, err));
        // Pipe the read stream into the response
        // se enganacha al writestream de la "res", y se genera la respuesta automaticamente
        readStream.pipe(res).on('error', (err) => errorHandler(res, err));
        // .on('complete????', () => {}) para hacer cosas al terminar
    } else {
        res.status(400).json({message: 'filename must be specified as a query parameter.'});
    }
};

const errorHandler = (res, err) => {
    console.error('Unable to generate stream', err);
    res.status(500).json({message: 'Unable to generate stream.'});
};

// para separar los routes; en el runtime esta:
// app.use('/download', downloadHandler);
// por lo que esto escucha el get de /download
const router = express.Router();
router.get('/', fileDownload);

module.exports = router;
