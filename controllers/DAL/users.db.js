var mongoose = require('mongoose');
var models = require('../../models/users');
var ObjectId = mongoose.Types.ObjectId;

var userModel = mongoose.model('works', models.users.user);

module.exports.getUserById = (workid, callback) => {
    userModel.findById(workid, callback);
};

module.exports.getUserByFbId = (fbId, callback) => {
    userModel.findOne({'facebookid' : fbId}, callback);
};

module.exports.addUser = (newUser, callback) => {
    var newUserObj = new userModel(newUser);
    newUserObj.save(callback);
};

// Do we need that crap ?
module.exports.updateUser = (updatedUser, callback) => {
    userModel.findOneAndUpdate({'_id': new ObjectId(updatedUser._id)}, updatedUser, callback);
};
