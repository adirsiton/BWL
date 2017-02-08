var mongoose = require('mongoose');

module.exports.opinion = new mongoose.Schema({
    userFbIds: String,
    comment: String
});