var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
    author: String,
    content:String
});

var partySchema = new Schema({
    creator: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    creatorId: {
        type:String,
        required:true
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
    attendees: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
    comments:[commentsSchema]
});

module.exports = mongoose.model('Party', partySchema); 