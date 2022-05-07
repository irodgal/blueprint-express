'use strict';

const express = require('express');
const port = 3331;

// Allocate an express application
const app = express();

// express configuration
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const service1 = (req, res) => {

    console.log('Received request 222222!');
        console.log('Headers', req.headers);
        console.log('Query params', req.query);
        console.log('Path params', req.params);


    // res.addHeader('lalala', 'pepepe222')
    console.log('111')
    res.set('lalala333333', 'pepepe')

    res.status(200).send('service1 OK!');
    //res.json({message: 'Hello forward!'});
};

app.get('/service1', service1);


// endpoints


// Default handler
const defaultHandler = (req, res) => {
    console.log('Not found: ', req.url)
    res.sendStatus(404);
};
app.all('*', defaultHandler);

// Configure exposed port and start listening
app.listen(port, () => {
    console.log(`service1 listening on ${port}`);
});

// Configure error handler
app.on('error', (err) => {
    console.error(`service1 unable to start on port ${port}`, err);
});
