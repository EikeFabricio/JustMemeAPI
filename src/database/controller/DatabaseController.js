const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://eikefabricio:fabricioeike@cluster0-eavrz.gcp.mongodb.net/test?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true });

const schemas = require('../schema/DatabaseSchema');

const connection = mongoose.connection;

module.exports = {connection, 
    async create() {
        let Post = mongoose.model('Post', schemas.postSchema);
        let Profile = mongoose.model('Profile', schemas.profileSchema);

        await Post.createCollection(), Profile.createCollection();
    }
};