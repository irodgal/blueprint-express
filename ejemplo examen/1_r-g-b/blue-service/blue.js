'use strict';

const getBlue = (req, res) => {
    res.status(200).send('blue service OK!')
};

module.exports = getBlue;