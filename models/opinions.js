var mongoose = require('mongoose');

module.exports.opinion = new mongoose.Schema({
    userFbId: String,
    opinion: String,
    name : String
});