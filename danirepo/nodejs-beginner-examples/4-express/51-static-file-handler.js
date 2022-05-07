'use strict';

const express = require('express');
const path = require('path');

//__dirname para rutas absolutas
const staticFolder = path.join(__dirname, 'static');
const staticFileHandler = express.static(staticFolder)

module.exports = staticFileHandler;
