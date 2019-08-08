const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const server = express();

mongoose.connect("mongodb+srv://teste:teste@cluster0-mtshc.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true
});

server.use(express.json());
server.use(cors());
server.use(routes);

server.listen(3033);