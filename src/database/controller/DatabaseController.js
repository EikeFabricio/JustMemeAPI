const mongoose = require('mongoose');
const schemas = require('../schema/DatabaseSchema');
const loginJson = require('./login.json')

mongoose.connect(loginJson.url, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

module.exports = {connection, 
    async create() {
        let Post = mongoose.model('Post', schemas.postSchema);
        let Profile = mongoose.model('Profile', schemas.profileSchema);

        await Post.createCollection(), Profile.createCollection();
    }
};