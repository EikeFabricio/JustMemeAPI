const mongoose = require('mongoose');

const schema = require('../../schema/DatabaseSchema');

const Profile = mongoose.model('Profile', schema.profileSchema);
const Post = mongoose.model('Post', schema.postSchema);

module.exports = {
    async create(request, response) {
        const post = new Post(request.body);

        const { authorEmail } = request.body;
        
        const profile = await Profile.findOne({ email: authorEmail });
        profile.memes.push(post.postId);

        await profile.save();
        await post.save();

        return response.send(post.toJSON());
    },
    async index(request, response) {
        const body = request.body;

        if (body.authorEmail !== undefined) {
            await Post.find({ authorEmail: body.authorEmail }, (err, posts) => {
                return response.json(posts);
            });
        } else {
            await Post.find({}, (err, posts) => {
                return response.json(posts);
            });
        }
    },
    async changeMeta(request, response) {
        const post = await Post.findOne({ postId: request.body.postId });
        const { like, deslike } = request.body;

        post.meta.likes += like;
        post.meta.deslikes += deslike;

        await post.save();

        return response.status(200).send(post.toJSON());
    }
    
};

