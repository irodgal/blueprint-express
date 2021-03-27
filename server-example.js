'use strict'

// Import the express module
const express = require('express');

// Allocate an express application
const app = new express();
const port  = 3000;

// Get handler
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

// Configure exposed port and start listening
app.listen(port, () => {
    console.log(`Application listening on ${port}`);
});

// Configure error handler
app.on('error', (err) => {
    console.error(`Application unable to start on port ${port}`, err);
})
