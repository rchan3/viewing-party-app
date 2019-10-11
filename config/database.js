var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project-2',{
    useNewUrlParser:true
});

var db = mongoose.connection;

db.on('connected', function() {
    console.log(`connected to mongodb at ${db.host}:${db.port}`);
});