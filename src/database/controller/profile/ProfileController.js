const mongoose = require('mongoose');
const schema = require('../../schema/DatabaseSchema');
const Hash = require('crypto').createHash('sha256');

const Profile = mongoose.model('Profile', schema.profileSchema);

module.exports = {
    async create(prof) {
        let profile = new Profile(prof);

        Hash.update(profile.password);
        
        const encryptedPassword = Hash.digest('hex');

        profile.password = encryptedPassword;

        await profile.save(); 

        return profile;
    },
    async delete(prof) {
        const { email } = prof;

        await Profile.deleteOne({ email });
    },
    async changePhoto(profile, photoUrl) {
        const { email } = profile;
        const prof = await Profile.findOne({ email });
        prof.photo = photoUrl;

        await prof.save();
    }
};