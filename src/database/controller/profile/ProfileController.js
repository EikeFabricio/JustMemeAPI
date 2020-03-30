const mongoose = require('mongoose');

const schema = require('../../schema/DatabaseSchema');

const Profile = mongoose.model('Profile', schema.profileSchema);

function err(error, obj) {
    if (err) return console.log(`error on bd attempt ${obj} > ${error}`)
}

module.exports = {
    async create(prof) {
        let profile = new Profile(prof);

        await profile.save();
    },
    async delete(prof) {
        let profile = new Profile(prof);

        await Profile.deleteOne(profile);
    },
    async changePhoto(prof, photoUrl) {
        let profile = await Profile.updateOne({ 
            email: prof.email 
        }, { 
            $set: { 
                photo: photoUrl 
            } 
        });

        await profile.save()
    }
};