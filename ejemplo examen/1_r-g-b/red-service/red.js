'use strict';

const getRed = (req, res) => {
    res.status(200).send('red service OK!')
};

module.exports = getRed;