const express = require('express');
const database = require('./database/Database');

const PostController = require('./database/controller/post/PostController');
const ProfileController = require('./database/controller/profile/ProfileController');

const app = express();

database.create();

app.use(express.json());

app.listen(3333, () => {
    console.log("API rodando na porta 3333!");
});

module.exports = {
    PostController,
    ProfileController
};


