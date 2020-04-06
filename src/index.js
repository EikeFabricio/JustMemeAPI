const express = require('express');
const database = require('./database/Database');
const app = express();
const routes = require('./routes/Routes');

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log("API rodando na porta 3333!");
});

database.create();

