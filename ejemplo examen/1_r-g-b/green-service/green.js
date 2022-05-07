'use strict';

const getGreen = (req, res) => {
    res.status(200).send('green service OK!')
};

module.exports = getGreen;