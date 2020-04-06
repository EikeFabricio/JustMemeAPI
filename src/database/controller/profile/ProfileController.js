const mongoose = require('mongoose');
const schema = require('../../schema/DatabaseSchema');
const crypto = require('crypto');
const Profile = mongoose.model('Profile', schema.profileSchema);

let Hash;

module.exports = {
    async create(request, response) {
        let profile = new Profile(request.body);

        Hash = crypto.createHash('sha256');

        Hash.update(profile.password);
        
        const encryptedPassword = Hash.digest('hex');

        profile.password = encryptedPassword;

        await profile.save(); 

        return response.send(profile.toJSON());
    },
    async delete(request, response) {
        const { email } = request.body;

        await Profile.deleteOne({ email });

        return response.status(202).json({ success: `${email} profile deleted.`} )
    },
    async changePhoto(request, response) {
        const { email, photoUrl } = request.body;
        const prof = await Profile.findOne({ email });
        prof.photo = photoUrl;

        await prof.save();

        return response.send(prof.toJSON());
    },
    async index(request, response) {
        await Profile.find({}, (err, users) => {
           return response.json(users); 
        });
    }
};