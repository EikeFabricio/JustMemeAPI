const express = require('express');

const ProfileController = require('../database/controller/profile/ProfileController');
const PostController = require('../database/controller/post/PostController');

const routes = express.Router();

routes.get("/", (request, response) => { return response.status(200).json({}); });

routes.post("/profile", ProfileController.create);
routes.delete("/profile", ProfileController.delete);
routes.get("/profile", ProfileController.index);
routes.put("/profile", ProfileController.changePhoto)



module.exports = routes;