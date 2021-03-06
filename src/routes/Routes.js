const express = require('express');

const ProfileController = require('../database/controller/profile/ProfileController');
const PostController = require('../database/controller/post/PostController');

const routes = express.Router();

routes.get("/", (request, response) => { return response.status(204).send() });

routes.post("/profile", ProfileController.create);
routes.delete("/profile", ProfileController.delete);
routes.get("/profile", ProfileController.index);
routes.put("/profile", ProfileController.changePhoto);

routes.post("/post", PostController.create);
routes.get("/post", PostController.index);
routes.put("/post", PostController.changeMeta);
routes.delete("/post", PostController.delete);

routes.post("/comments", PostController.comment);

module.exports = routes;
