var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    googleID: String,
    parties: [{
        type: Schema.Types.ObjectId, 
        ref: 'Party' 
    }]
});

module.exports = mongoose.model('User', userSchema); 