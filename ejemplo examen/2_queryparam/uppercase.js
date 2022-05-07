'use strict';

const uppercase = (req, res) => {
    // pilla mayusculas
    const src = req.query['SRC'];

    if (!src) {
        console.log('Error: no SRC queryparam');
        res.status(400).send('No SRC queryparam')
    } else {
        setTimeout(() => {
            res.status(200).send(src.toUpperCase())
        }, 1000);
        
    }

    
};

module.exports = uppercase;