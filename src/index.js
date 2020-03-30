const express = require('express');
const database = require('./database/Database');

const app = express();

database.create();

app.use(express.json());

app.listen(3333, () => {
    console.log("API rodando na porta 3333!");
});


