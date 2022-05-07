'use strict';

const path = require('path');

const defaultIndexResponse = (req, res) => {
    //__dirname para rutas absolutas, que lo necesita el sendFile
    const indexPath = path.join(__dirname, 'static', 'default-index.html');
    res.sendFile(indexPath);
};

module.exports = defaultIndexResponse;
