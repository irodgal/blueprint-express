'use strict';

const ipFilterMiddleware = (req, res, next) => {
    console.log(req.ip);
    console.log(req.connection.remoteAddress);
    if (req.ip.includes('127.0.0.1')) { // ????
        console.warn('IP Filtered');
        res.status(403).send('Forbidden: IP Filtered')
    } else {
        next();
    }
    
    /*
    const startTime = Date.now();
    next();
    const endTime = Date.now();
    console.log(`Request took ${(endTime - startTime) / 1000} seconds`);
    */
};

module.exports = ipFilterMiddleware;