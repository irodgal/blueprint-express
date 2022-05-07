'use strict';

const express = require('express');
const port = 3332;

// Allocate an express application
const app = express();

// express configuration
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// middlewares

const data = {
    2: 'data2',
    3: 'data3'
}

const service2 = (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    if (!id) {
        // res.sendStatus(400);
        console.log('No id param');
        res.status(400).json({error: 'No id param'});
    } else {

        if (!data.hasOwnProperty(id)) {
            res.sendStatus(404);
        } else {
            res.status(200).json({service2: `service2 with id:${id} OK!`});
        }
        
        
    }
};

app.get('/service2/:id', service2);


// Default handler
const defaultHandler = (req, res) => {
    console.log('Not found: ', req.url)
    res.sendStatus(404);
};
app.all('*', defaultHandler);

// Configure exposed port and start listening
app.listen(port, () => {
    console.log(`service2 listening on ${port}`);
});

// Configure error handler
app.on('error', (err) => {
    console.error(`service2 unable to start on port ${port}`, err);
});
