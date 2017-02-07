var mongoose = require('mongoose');

var opinion = new mongoose.Schema({
    userFbIds: String,
    comment: String
});