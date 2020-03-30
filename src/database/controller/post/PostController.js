const mongoose = require('mongoose');

const schema = require('../../schema/DatabaseSchema');

const Profile = mongoose.model('Profile', schema.profileSchema);
const Post = mongoose.model('Post', schema.postSchema);

module.exports = {
    async create(author, announce) {
        let profile = new Profile(author);
        let post = new Post(announce);

        await profile.save();
        await post.save();
    },
    async indexOf(author) {
        let profile = new Profile(author);

        let announces = await Post
                    .find()
                    .where('email')
                    .equals(profile.email)
                    .exec();

        return announces;
    },
    async index() {
        return await Post.find();
    },
    async delete(announce) {
        await Post.deleteOne(announce);
    }
};

