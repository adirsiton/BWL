var mongoose = require('mongoose');

var picture = new mongoose.Schema({
    picPath : String,
});

module.exports.work = new mongoose.Schema({
    description : String,
    title : String,
    pictures: [picture]
});