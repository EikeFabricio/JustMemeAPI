const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name: { type: String },
    creationDate: { type: Date, default: Date.now },
    memes: [{ postId: String }],
    photo: { type: String, default: 
'https://www.pngitem.com/pimgs/m/421-4212341_default-avatar-svg-hd-png-download.png' },
    email: { type: String },
    password: { type: String },
    role: { type: Number, default: 0 }
});
 
const postSchema = new Schema({
    authorEmail: { type: String },
    postId: { type: String },
    comments: [{
        authorEmail: { type: String },
        description: { type: String }
    }],
    meta: {
        likes: { type: Number, default: 0 },
        deslikes: { type: Number, default: 0 }
    },
    contentUrl: { type: String },
    nsfw: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});

module.exports = {postSchema, profileSchema};

