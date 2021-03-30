'use strict'

// Import the express module
const express = require('express');

// body-parser
const bodyParser = require('body-parser');

// Allocate an express application
const app = new express();
const port  = 3000;

// using application/json body-parser
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());


// GET handler
app.get('/people', (req, res) => {
    const people = [
        {
            name: 'Luke',
            lastname: 'Skywalker'
        },
        {
            name: 'Leia',
            lastname: 'Organa'
        },
        {
            name: 'Han',
            lastname: 'Solo'
        }
    ];
    

    res.status(200).json(people);
});

// POST handler
app.post('/people', (req, res) => {
    console.log('POST');
    console.log(req.body);

    res.status(200).send('POST ok!')
});
/*
curl --location --request POST 'http://localhost:3000/people' \
--header 'Content-Type: application/json' \
--data-raw '{
    "key": "vALUE"
}'
*/

// Configure exposed port and start listening
app.listen(port, () => {
    console.log(`Application listening on ${port}`);
});

// Configure error handler
app.on('error', (err) => {
    console.error(`Application unable to start on port ${port}`, err);
})
