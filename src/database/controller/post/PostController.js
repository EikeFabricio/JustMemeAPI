const mongoose = require('mongoose');

const schema = require('../../schema/DatabaseSchema');

const Profile = mongoose.model('Profile', schema.profileSchema);
const Post = mongoose.model('Post', schema.postSchema);

module.exports = {
    async create(request, response) {
        const post = new Post(request.body);
        post.postId = require('crypto').randomBytes(3).toString('HEX');

        const { authorEmail } = request.body;
        
        const profile = await Profile.findOne({ email: authorEmail });
        profile.memes.push({ postId: post.postId });

        await profile.save();
        await post.save();

        return response.send(post.toJSON());
    },
    async index(request, response) {
        const body = request.body;
        let arr;

        if (body.authorEmail !== undefined) {
            await Post.find({ authorEmail: body.authorEmail }, (err, posts) => {
                arr = posts;
            });
        } else {
            await Post.find({}, (err, posts) => {
                arr = posts;
            });
        }

        return response.status(200).json(arr);
    },
    async changeMeta(request, response) {
        const post = await Post.findOne({ postId: request.body.postId });
        const { like, deslike } = request.body;

        post.meta.likes += like;
        post.meta.deslikes += deslike;

        await post.save();

        return response.status(200).send(post.toJSON());
    },
    async delete(request, response) {
        const { postId } = request.body;
        
        await Post.delete({ postId });

        return response.status(200).json({ success: `${postId} deleted with success` })
    },
    async comment(request, response) {
        const { authorEmail, description, postId } = request.body;

        const post = await Post.findOne({ postId });
        post.comments.push({ authorEmail, description });

        await post.save();

        return response.status(200).send(post.toJSON());
    }
};

