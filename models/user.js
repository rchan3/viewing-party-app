var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    googleID: String
});

module.exports = mongoose.model('User', userSchema); 