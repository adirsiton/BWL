var mongoose = require('mongoose');
var models = require('../../models/opinions');
var ObjectId = mongoose.Types.ObjectId;

var opinionModel = mongoose.model('opinions', models.opinion);

module.exports.getAllOpinions = (callback) => {
    opinionModel.find({}, callback);
};

module.exports.getUserOpinions = (fbId, callback) => {
    opinionModel.findOne({'userFbIds' : fbId}, callback);
};

module.exports.addOpinion = (newOpinion, callback) => {
    var parsedOp = {
        userFbId : newOpinion.user,
        opinion : newOpinion.opinion,
        name : newOpinion.name
    };
    var newOpinion = new opinionModel(parsedOp);
    newOpinion.save(callback);
};

module.exports.removeOpinion = (opinionId, callback) => {
    opinionModel.findById(opinionId).remove(callback);
};

module.exports.updateOpinion = (updatedOpinion, callback) => {
    opinionModel.findOneAndUpdate({'_id': new ObjectId(updatedOpinion._id)}, updatedOpinion, callback);
};
