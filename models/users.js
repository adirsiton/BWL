var mongoose = require('mongoose');

var user = new mongoose.Schema({
    facebookId: String,
    isAdmin : Boolean
});

module.exports = {
    user : user
}