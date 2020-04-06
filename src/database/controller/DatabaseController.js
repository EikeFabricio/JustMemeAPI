const mongoose = require('mongoose');
const schemas = require('../schema/DatabaseSchema');
const login = require('./files/login.json')

mongoose.connect(login.url, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

module.exports = {connection, 
    async create() {
        let Post = mongoose.model('Post', schemas.postSchema);
        let Profile = mongoose.model('Profile', schemas.profileSchema);

        await Post.createCollection(), Profile.createCollection();
    }
};
