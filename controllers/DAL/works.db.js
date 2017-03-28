var mongoose = require('mongoose');
var models = require('../../models/works');
var ObjectId = mongoose.Types.ObjectId;

var workModel = mongoose.model('works', models.work);


module.exports.getAllWorks = (callback) => {
    workModel.find({}, callback);
};

module.exports.getWorkById = (workid, callback) => {
    workModel.findById(workid, callback);
};

module.exports.getWorkByName = (workname, callback) => {
    workModel.findOne({'title': workname}, callback);
};

module.exports.addWork = (newWork, callback) => {
    var newWorkObj = new workModel(newWork);
    newWorkObj.save(callback);
};

module.exports.updateWork = (updatedWork, callback) => {
    workModel.findOneAndUpdate({'_id': new ObjectId(updatedWork._id)}, updatedWork, callback);
};

module.exports.addPictures = (workId, newPicPaths, callback) => {
    workModel.findByIdAndUpdate(workId,
                                {$push : {"pictures" : {$each : newPicPaths}}},
                                callback);
};
module.exports.removeWork = (workId, callback) => {
    workModel.findById(workId).remove(callback);
};