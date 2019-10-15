var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    content:String
});

var partySchema = new Schema({
    creator: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    name: {
        type:String,
        required: true
    },
    date: {
        type: Date,
        required:true
    },
    type: {
        type:String,
        required:true
    },
    address: {
        type:String
    },
    comments:[commentsSchema]
});

module.exports = mongoose.model('Party', partySchema); 